"""Gera capas de tela inicial a partir da identidade real de cada sistema."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

PUBLIC = Path(r"d:\SISPORTF\sisportf\public\projects")
W, H = 1600, 900


def font(size: int, bold: bool = False):
    names = [
        "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
    ]
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def cover(path: Path) -> Image.Image:
    src = Image.open(path).convert("RGB")
    scale = max(W / src.width, H / src.height)
    src = src.resize((int(src.width * scale), int(src.height * scale)), Image.Resampling.LANCZOS)
    left = max(0, (src.width - W) // 2)
    top = max(0, src.height - H) if "gersau" in str(path).lower() else max(0, (src.height - H) // 2)
    if "Tela_fundo" in str(path) and "GERSAU" in str(path):
        top = max(0, src.height - H)
        left = 0
    return src.crop((left, top, left + W, top + H))


def contain_bg(path: Path, fill=(255, 255, 255)) -> Image.Image:
    src = Image.open(path).convert("RGB")
    canvas = Image.new("RGB", (W, H), fill)
    scale = min(W / src.width, H / src.height)
    src = src.resize((int(src.width * scale), int(src.height * scale)), Image.Resampling.LANCZOS)
    canvas.paste(src, ((W - src.width) // 2, (H - src.height) // 2))
    return canvas


def save_jpg(im: Image.Image, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(dest, "JPEG", quality=86, optimize=True)
    print(f"{dest.name} {dest.stat().st_size // 1024}KB -> {dest}")


def paste_card(base: Image.Image, box, radius=18, fill=(255, 255, 255, 255), shadow=True):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    if shadow:
        sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle(
            (box[0] + 8, box[1] + 12, box[2] + 8, box[3] + 12), radius, fill=(15, 23, 42, 70)
        )
        base = Image.alpha_composite(base.convert("RGBA"), sh.filter(ImageFilter.GaussianBlur(16)))
    ImageDraw.Draw(layer).rounded_rectangle(box, radius, fill=fill)
    return Image.alpha_composite(base.convert("RGBA"), layer)


def field(draw, x, y, w, label, placeholder, label_color="#334155", ph="#94a3b8", radius=8):
    draw.text((x, y), label, fill=label_color, font=font(20, True))
    draw.rounded_rectangle((x, y + 30, x + w, y + 78), radius=radius, outline="#d7dee8", width=2, fill="#ffffff")
    draw.text((x + 14, y + 44), placeholder, fill=ph, font=font(18))


def button(draw, box, text, fill, radius=8):
    draw.rounded_rectangle(box, radius=radius, fill=fill)
    cx = (box[0] + box[2]) / 2
    cy = (box[1] + box[3]) / 2
    tw = draw.textlength(text, font=font(22, True))
    draw.text((cx - tw / 2, cy - 14), text, fill="#ffffff", font=font(22, True))


def processos():
    canvas = paste_card(cover(Path(r"D:\PROCESSOS\imagens\Tela_fundo.png")), (1140, 70, 1540, 830), 16)
    draw = ImageDraw.Draw(canvas)
    logo = Image.open(Path(r"D:\PROCESSOS\imagens\mcp.png")).convert("RGBA")
    logo.thumbnail((150, 150), Image.Resampling.LANCZOS)
    canvas.paste(logo, (1265, 100), logo)
    draw.text((1195, 300), "Controle de processos", fill="#0f172a", font=font(24, True))
    draw.text((1238, 338), "Acesso ao sistema", fill="#1e293b", font=font(22, True))
    draw.text((1178, 376), "Informe seu login e senha para entrar.", fill="#64748b", font=font(16))
    field(draw, 1170, 430, 340, "Login", "Seu login", radius=10)
    field(draw, 1170, 540, 340, "Senha", "••••••••", radius=10)
    draw.text((1418, 588), "Mostrar", fill="#315efb", font=font(14, True))
    button(draw, (1170, 670, 1510, 730), "Entrar", "#315efb", 10)
    save_jpg(canvas, PUBLIC / "processos" / "login.jpg")


def gersau():
    canvas = paste_card(cover(Path(r"D:\GERSAU 3.0\GERSAU 3.0\imagens\Tela_fundo.png")), (1140, 70, 1540, 830), 18)
    draw = ImageDraw.Draw(canvas)
    logo = Image.open(Path(r"D:\GERSAU 3.0\GERSAU 3.0\imagens\Gersau.png")).convert("RGBA")
    logo.thumbnail((320, 96), Image.Resampling.LANCZOS)
    canvas.paste(logo, (1180, 96), logo)
    draw.text((1172, 210), "Bem-vindo", fill="#1565c0", font=font(38, True))
    draw.text((1172, 262), "Faça login para acessar o sistema", fill="#8a97a6", font=font(18))
    field(draw, 1172, 320, 336, "Usuário", "Digite seu usuário")
    field(draw, 1172, 430, 336, "Senha", "Digite sua senha")
    button(draw, (1172, 560, 1508, 620), "Entrar", "#1e88e5")
    draw.text((1192, 660), "Superintendência Gestão do Trabalho em Saúde", fill="#90a0b0", font=font(13))
    save_jpg(canvas, PUBLIC / "gersau" / "login.jpg")


def rh_conecta():
    canvas = paste_card(
        cover(Path(r"C:\BKP\FREQUENCIA 2.0\rh-conecta\client\public\fundo-com-logo.png")),
        (1120, 160, 1540, 740),
        22,
        fill=(255, 255, 255, 240),
    )
    draw = ImageDraw.Draw(canvas)
    draw.text((1160, 200), "Bem-vindo", fill="#0b3d6e", font=font(36, True))
    draw.text((1160, 254), "Entre com seu usuário e senha", fill="#5b6b7c", font=font(17))
    draw.text((1160, 278), "para acessar o portal.", fill="#5b6b7c", font=font(17))
    field(draw, 1160, 330, 340, "Usuário", "Digite seu usuário")
    field(draw, 1160, 440, 340, "Senha", "Digite sua senha")
    button(draw, (1160, 560, 1500, 618), "Entrar", "#0b3d6e")
    draw.text((1210, 650), "Comunicação · Atendimento · Informação", fill="#6b7c8d", font=font(13))
    save_jpg(canvas, PUBLIC / "rh-conecta" / "login.jpg")


def people_analytics():
    fundo = PUBLIC / "people-analytics" / "cover-brand.png"
    if not fundo.exists():
        fundo = PUBLIC / "people-analytics" / "login.jpg"
    canvas = cover(fundo)
    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shade).rectangle((980, 0, W, H), fill=(5, 12, 28, 95))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), shade)
    canvas = paste_card(canvas, (1100, 160, 1540, 740), 16, fill=(12, 22, 42, 210))
    draw = ImageDraw.Draw(canvas)
    draw.text((1140, 200), "Acessar sistema", fill="#ffffff", font=font(30, True))
    draw.text((1140, 248), "Entre com seu usuário e senha", fill="#cbd5e1", font=font(16))
    field(draw, 1140, 310, 360, "Usuário", "Digite seu usuário", label_color="#e2e8f0")
    field(draw, 1140, 430, 360, "Senha", "Digite sua senha", label_color="#e2e8f0")
    button(draw, (1140, 560, 1500, 620), "Entrar", "#2b6cb0", 10)
    save_jpg(canvas, PUBLIC / "people-analytics" / "login.jpg")


def pesquisa_pcpi():
    banner = Path(r"D:\MESTRADO NANI\sistema-pesquisa-pcpi\public\images\login-pesquisa-mestrado.jpeg")
    left = Image.new("RGB", (W, H), "#ffffff")
    src = Image.open(banner).convert("RGB")
    max_w, max_h = 920, 860
    scale = min(max_w / src.width, max_h / src.height)
    src = src.resize((int(src.width * scale), int(src.height * scale)), Image.Resampling.LANCZOS)
    left.paste(src, (20, (H - src.height) // 2))
    canvas = left.convert("RGBA")
    form = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(form).rectangle((980, 0, W, H), fill=(255, 255, 255, 255))
    canvas = Image.alpha_composite(canvas, form)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((1040, 90, 1088, 138), 12, fill="#1a3b5d")
    draw.text((1052, 100), "Pc", fill="#ffffff", font=font(18, True))
    draw.text((1040, 156), "Tecnologia, Inovação e Práticas Pedagógicas", fill="#2f9e44", font=font(14, True))
    draw.text((1040, 186), "Área Administrativa", fill="#1a3b5d", font=font(34, True))
    draw.text((1040, 236), "Acompanhe respostas, indicadores e exportações.", fill="#475569", font=font(16))
    draw.rounded_rectangle((1040, 286, 1540, 370), 16, outline="#c5e4ff", width=2, fill="#f0f7ff")
    draw.ellipse((1056, 308, 1092, 344), fill="#1a3b5d")
    draw.text((1106, 304), "Acesso restrito", fill="#1a3b5d", font=font(16, True))
    draw.text((1106, 328), "Exclusivo para o pesquisador responsável.", fill="#475569", font=font(14))
    field(draw, 1040, 400, 500, "Usuário", "Digite seu usuário", label_color="#1a3b5d", radius=12)
    field(draw, 1040, 510, 500, "Senha", "Digite sua senha", label_color="#1a3b5d", radius=12)
    button(draw, (1040, 630, 1540, 686), "Entrar", "#1a3b5d", 12)
    draw.text((1188, 760), "Sistema de Pesquisa Acadêmica", fill="#94a3b8", font=font(14))
    save_jpg(canvas, PUBLIC / "pesquisa-pcpi" / "login.jpg")


def painel_tv():
    canvas = Image.new("RGB", (W, H), "#020617")
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.ellipse((-120, -80, 620, 420), fill=(34, 211, 238, 36))
    draw.ellipse((1100, 520, 1760, 1040), fill=(168, 85, 247, 32))
    canvas = paste_card(canvas, (520, 210, 1080, 690), 24, fill=(11, 18, 32, 255))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((764, 250, 836, 322), 16, fill="#0f172a")
    draw.line([(778, 304), (790, 276), (802, 292), (814, 264), (826, 284)], fill="#22d3ee", width=4)
    draw.text((668, 360), "Folha Intelligence", fill="#67e8f9", font=font(36, True))
    draw.text((690, 418), "PAINEL LIVE  ·  TV", fill="#94a3b8", font=font(16, True))
    draw.rounded_rectangle((690, 480, 910, 486), 4, fill="#1e293b")
    draw.rounded_rectangle((690, 480, 820, 486), 4, fill="#22d3ee")
    draw.text((700, 520), "Iniciando módulo de dados…", fill="#94a3b8", font=font(16))
    save_jpg(canvas, PUBLIC / "painel-tv" / "login.jpg")


def geolocalizacao():
    canvas = Image.new("RGB", (W, H), "#071424")
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.line([(180, 720), (420, 540), (740, 430), (1100, 300), (1420, 360)], fill=(61, 123, 255, 80), width=3)
    draw.line([(220, 280), (700, 220), (980, 340), (1280, 520), (1480, 480)], fill=(61, 123, 255, 70), width=3)
    for x, y, r in [(420, 560, 8), (740, 430, 10), (980, 340, 8), (1180, 510, 9), (1320, 390, 7)]:
        draw.ellipse((x - r * 3, y - r * 3, x + r * 3, y + r * 3), fill=(96, 165, 250, 70))
        draw.ellipse((x - r, y - r, x + r, y + r), fill="#67e8f9")
    canvas = paste_card(canvas, (70, 70, 620, 300), 24, fill=(16, 28, 48, 235))
    draw = ImageDraw.Draw(canvas)
    draw.text((100, 110), "Geolocalização de Unidades", fill="#f3f6fb", font=font(30, True))
    draw.text((100, 168), "Tratamento de endereços e preparação", fill="#9aadc2", font=font(18))
    draw.text((100, 198), "das coordenadas para análise espacial.", fill="#9aadc2", font=font(18))
    save_jpg(canvas, PUBLIC / "geolocalizacao" / "login.jpg")


def sind():
    canvas = Image.new("RGB", (W, H), "#020617")
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((800, 0, W, H), fill="#f1f5f9")
    logo = Image.open(Path(r"C:\BKP\SIND\frontend\public\imagens\sind_logo.png")).convert("RGBA")
    max_w, max_h = 680, 640
    scale = min(max_w / logo.width, max_h / logo.height)
    logo = logo.resize((int(logo.width * scale), int(logo.height * scale)), Image.Resampling.LANCZOS)
    canvas.paste(logo, ((800 - logo.width) // 2, (H - logo.height) // 2), logo)
    canvas = paste_card(canvas, (900, 140, 1510, 760), 22, fill=(255, 255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    draw.text((950, 190), "Acesse o sistema", fill="#1e293b", font=font(30, True))
    draw.text((950, 238), "Informe seu usuário e senha", fill="#64748b", font=font(16))
    draw.text((950, 262), "para continuar.", fill="#64748b", font=font(16))
    field(draw, 950, 320, 510, "Usuário", "Digite seu usuário")
    field(draw, 950, 440, 510, "Senha", "Digite sua senha")
    button(draw, (950, 570, 1460, 636), "Entrar", "#2563eb", 10)
    draw.text((1008, 690), "Acesso registrado para fins de auditoria.", fill="#94a3b8", font=font(14))
    save_jpg(canvas, PUBLIC / "sind" / "login.jpg")
    gallery = Path(r"C:\BKP\SIND\frontend\public\imagens\sind_logo.png")
    dest = PUBLIC / "sind" / "gallery-01.png"
    dest.parent.mkdir(parents=True, exist_ok=True)
    Image.open(gallery).convert("RGBA").save(dest, "PNG")
    print(f"{dest.name} {dest.stat().st_size // 1024}KB -> {dest}")


if __name__ == "__main__":
    processos()
    gersau()
    rh_conecta()
    people_analytics()
    pesquisa_pcpi()
    painel_tv()
    geolocalizacao()
    sind()
    print("ok")
