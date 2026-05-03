//go:build !windows

package internal

import (
	"os"
	"os/exec"
	"syscall"
)

func setProcessGroup(cmd *exec.Cmd) {
	if cmd.SysProcAttr == nil {
		cmd.SysProcAttr = &syscall.SysProcAttr{}
	}
	cmd.SysProcAttr.Setpgid = true
}

func killProcess(proc *os.Process) error {
	pgid, err := syscall.Getpgid(proc.Pid)
	if err != nil {
		return err
	}
	return syscall.Kill(-pgid, syscall.SIGTERM)
}
