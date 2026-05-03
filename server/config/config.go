package config

import (
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"time"

	"gopkg.in/yaml.v3"
)

type Config struct {
	LogPath              string   `yaml:"log_path"`
	EnableFileLogging    bool     `yaml:"enable_file_logging"`
	BaseURL              string   `yaml:"base_url"`
	Host                 string   `yaml:"host"`
	Port                 int      `yaml:"port"`
	DownloadPath         string   `yaml:"downloadPath"`
	DownloaderPath       string   `yaml:"downloaderPath"`
	RequireAuth          bool     `yaml:"require_auth"`
	Username             string   `yaml:"username"`
	Password             string   `yaml:"password"`
	QueueSize            int      `yaml:"queue_size"`
	LocalDatabasePath    string   `yaml:"local_database_path"`
	SessionFilePath      string   `yaml:"session_file_path"`
	path                 string   // private
	UseOpenId            bool     `yaml:"use_openid"`
	OpenIdProviderURL    string   `yaml:"openid_provider_url"`
	OpenIdClientId       string   `yaml:"openid_client_id"`
	OpenIdClientSecret   string   `yaml:"openid_client_secret"`
	OpenIdRedirectURL    string   `yaml:"openid_redirect_url"`
	OpenIdEmailWhitelist []string `yaml:"openid_email_whitelist"`
	FrontendPath         string   `yaml:"frontend_path"`
	AutoArchive          bool     `yaml:"auto_archive"`
	Twitch               struct {
		ClientId      string        `yaml:"client_id"`
		ClientSecret  string        `yaml:"client_secret"`
		CheckInterval time.Duration `yaml:"check_interval"`
	} `yaml:"twitch"`
}

var (
	instance     *Config
	instanceOnce sync.Once
)

func Instance() *Config {
	if instance == nil {
		instanceOnce.Do(func() {
			instance = &Config{}
			instance.Twitch.CheckInterval = time.Minute * 5
		})
	}
	return instance
}

// Initialises the Config struct given its config file
func (c *Config) LoadFile(filename string) error {
	fd, err := os.Open(filename)
	if err != nil {
		return err
	}

	c.path = filename

	if err := yaml.NewDecoder(fd).Decode(c); err != nil {
		return err
	}

	c.Normalize()

	return nil
}

// Path of the directory containing the config file
func (c *Config) Dir() string { return filepath.Dir(c.path) }

// Absolute path of the config file
func (c *Config) Path() string { return c.path }

// Normalize applies cross-platform compatibility fixes to runtime config values.
func (c *Config) Normalize() {
	c.DownloaderPath = normalizeDownloaderPath(c.DownloaderPath)
}

func normalizeDownloaderPath(path string) string {
	path = strings.TrimSpace(path)
	if path == "" {
		return path
	}

	// Explicit path (absolute or relative with separators): keep user intent.
	if strings.ContainsAny(path, `/\`) || filepath.IsAbs(path) {
		return path
	}

	// Go's os/exec refuses bare commands resolved from "." (ErrDot).
	// Prefer explicit local path when a matching executable is present.
	if runtime.GOOS == "windows" {
		if _, err := os.Stat(path); err == nil {
			return "." + string(filepath.Separator) + path
		}

		if !strings.EqualFold(filepath.Ext(path), ".exe") {
			exe := path + ".exe"
			if _, err := os.Stat(exe); err == nil {
				return "." + string(filepath.Separator) + exe
			}
		}
	}

	lookedUp, err := exec.LookPath(path)
	if errors.Is(err, exec.ErrDot) && lookedUp != "" {
		if strings.ContainsAny(lookedUp, `/\`) {
			return lookedUp
		}
		return "." + string(filepath.Separator) + lookedUp
	}

	return path
}
