"""Copia fundos reais e captura as telas iniciais em JPEG."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(r"d:\SISPORTF\sisportf")
CAPS = ROOT / "scripts" / "login-caps"
ASSETS = CAPS / "assets"
PUBLIC = ROOT / "public" / "projects"

COPIES = {
    "processos-fundo.png": Path(r"D:\PROCESSOS\imagens\Tela_fundo.png"),
    "mcp.png": Path(r"D:\PROCESSOS\imagens\mcp.png"),
    "gersau-fundo.png": Path(r"D:\GERSAU 3.0\GERSAU 3.0\imagens\Tela_fundo.png"),
    "gersau-mod.png": Path(r"D:\GERSAU 3.0\GERSAU 3.0\imagens\Gersau.png"),
    "rh-fundo.png": Path(r"C:\BKP\FREQUENCIA 2.0\rh-conecta\client\public\fundo-com-logo.png"),
    "people-fundo.jpg": ROOT / "public" / "projects" / "people-analytics" / "login.jpg",
    "pcpi-banner.jpeg": Path(r"D:\MESTRADO NANI\sistema-pesquisa-pcpi\public\images\login-pesquisa-mestrado.jpeg"),
}

SHOTS = {
    "processos.html": PUBLIC / "processos" / "login.jpg",
    "gersau.html": PUBLIC / "gersau" / "login.jpg",
    "rh-conecta.html": PUBLIC / "rh-conecta" / "login.jpg",
    "people-analytics.html": PUBLIC / "people-analytics" / "login.jpg",
    "pesquisa-pcpi.html": PUBLIC / "pesquisa-pcpi" / "login.jpg",
    "painel-tv.html": PUBLIC / "painel-tv" / "login.jpg",
    "geolocalizacao.html": PUBLIC / "geolocalizacao" / "login.jpg",
}

BROWSERS = [
    Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
]


def browser() -> Path:
    for path in BROWSERS:
        if path.exists():
            return path
    raise FileNotFoundError("Chrome ou Edge não encontrado para capturar as telas.")


def file_url(path: Path) -> str:
    return path.resolve().as_uri()


def to_jpeg(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    im = Image.open(src).convert("RGB")
    im = im.resize((1600, 900), Image.Resampling.LANCZOS)
    im.save(dest, "JPEG", quality=86, optimize=True)
    print(f"{dest} {dest.stat().st_size // 1024}KB")


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    for name, src in COPIES.items():
        if not src.exists():
            raise FileNotFoundError(src)
        dest = ASSETS / name
        shutil.copy2(src, dest)
        print(f"asset {name}")

    exe = browser()
    print(f"browser {exe}")
    tmp = CAPS / "_shots"
    tmp.mkdir(exist_ok=True)

    for html_name, dest in SHOTS.items():
        html = CAPS / html_name
        png = tmp / (html.stem + ".png")
        if png.exists():
            png.unlink()
        cmd = [
            str(exe),
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--allow-file-access-from-files",
            "--window-size=1600,900",
            f"--screenshot={png}",
            file_url(html),
        ]
        subprocess.run(cmd, check=True)
        if not png.exists():
            raise FileNotFoundError(f"Screenshot não gerada: {png}")
        to_jpeg(png, dest)


if __name__ == "__main__":
    main()
