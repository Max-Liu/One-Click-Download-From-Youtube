package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
)

var curentDir, videoDir string

func knock(w http.ResponseWriter, r *http.Request) {
	curentDir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	videoDir := curentDir + "/video"

	url := r.FormValue("url")[1:]

	out, err := exec.Command("youtube-dl", url, "--max-quality", "mp4", "-o", videoDir+"/%(title)s.%(ext)s").Output()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("The date is %s\n", out)

}

func main() {

	http.HandleFunc("/", knock)
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
