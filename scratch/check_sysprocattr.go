package main
import (
	"fmt"
	"syscall"
)
func main() {
	attr := syscall.SysProcAttr{}
	fmt.Printf("%+v\n", attr)
}
