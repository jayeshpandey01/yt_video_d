package formats

import (
	"encoding/json"
	"log/slog"
	"os/exec"

	"github.com/marcopiovanello/yt-dlp-web-ui/v3/server/config"
)

func ParseURL(url string) (*Metadata, error) {
	cmd := exec.Command(config.Instance().DownloaderPath, url, "-J")

	stdout, err := cmd.Output()
	if err != nil {
		slog.Error("failed to retrieve metadata", slog.String("err", err.Error()))
		return nil, err
	}

	slog.Info(
		"retrieving metadata",
		slog.String("caller", "getFormats"),
		slog.String("url", url),
	)

	info := &Metadata{URL: url}
	best := &Format{}

	if err := json.Unmarshal(stdout, &info); err != nil {
		return nil, err
	}

	if err := json.Unmarshal(stdout, &best); err != nil {
		return nil, err
	}

	info.Best = *best

	return info, nil
}
