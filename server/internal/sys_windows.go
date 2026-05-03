//go:build windows

package internal

import (
	"os"
	"os/exec"
)

func setProcessGroup(cmd *exec.Cmd) {
	// On Windows, Setpgid is not available.
}

func killProcess(proc *os.Process) error {
	// On Windows, killing a process group is different.
	// For now, we'll just kill the main process.
	return proc.Kill()
}
