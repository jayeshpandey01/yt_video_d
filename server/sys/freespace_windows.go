//go:build windows

package sys

import (
	"github.com/marcopiovanello/yt-dlp-web-ui/v3/server/config"
	"golang.org/x/sys/windows"
)

func FreeSpace() (uint64, error) {
	var freeBytes uint64
	var totalBytes uint64
	var totalFreeBytes uint64

	pathPtr, err := windows.UTF16PtrFromString(config.Instance().DownloadPath)
	if err != nil {
		return 0, err
	}

	err = windows.GetDiskFreeSpaceEx(pathPtr, &freeBytes, &totalBytes, &totalFreeBytes)
	if err != nil {
		return 0, err
	}

	return freeBytes, nil
}
