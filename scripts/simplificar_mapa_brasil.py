"""Gera SVG simplificado das UFs para o painel de BI."""

from __future__ import annotations

import json
from pathlib import Path

SRC = Path(r"d:\SISPORTF\sisportf\scripts\brazil-states.geojson")
OUT = Path(r"d:\SISPORTF\sisportf\data\brazil-ufs.ts")

LON_MIN, LON_MAX = -74.1, -32.3
LAT_MIN, LAT_MAX = -34.0, 5.4
WIDTH, HEIGHT = 820, 760
EPS = 0.09

REGIAO = {
    "AC": "Norte",
    "AP": "Norte",
    "AM": "Norte",
    "PA": "Norte",
    "RO": "Norte",
    "RR": "Norte",
    "TO": "Norte",
    "AL": "Nordeste",
    "BA": "Nordeste",
    "CE": "Nordeste",
    "MA": "Nordeste",
    "PB": "Nordeste",
    "PE": "Nordeste",
    "PI": "Nordeste",
    "RN": "Nordeste",
    "SE": "Nordeste",
    "DF": "Centro-Oeste",
    "GO": "Centro-Oeste",
    "MT": "Centro-Oeste",
    "MS": "Centro-Oeste",
    "ES": "Sudeste",
    "MG": "Sudeste",
    "RJ": "Sudeste",
    "SP": "Sudeste",
    "PR": "Sul",
    "RS": "Sul",
    "SC": "Sul",
}


def project(lon: float, lat: float) -> tuple[float, float]:
    x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * WIDTH
    y = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * HEIGHT
    return round(x), round(y)


def dist_point_seg(p, a, b) -> float:
    ax, ay = a
    bx, by = b
    px, py = p
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
    t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    qx, qy = ax + t * dx, ay + t * dy
    return ((px - qx) ** 2 + (py - qy) ** 2) ** 0.5


def simplify(points: list[tuple[float, float]], eps: float) -> list[tuple[float, float]]:
    if len(points) < 8:
        return points
    stack = [(0, len(points) - 1)]
    keep = {0, len(points) - 1}
    while stack:
        start, end = stack.pop()
        max_d = -1.0
        index = None
        a, b = points[start], points[end]
        for i in range(start + 1, end):
            d = dist_point_seg(points[i], a, b)
            if d > max_d:
                max_d = d
                index = i
        if index is not None and max_d > eps:
            keep.add(index)
            stack.append((start, index))
            stack.append((index, end))
    return [points[i] for i in sorted(keep)]


def ring_area(ring) -> float:
    area = 0.0
    for i, (x1, y1) in enumerate(ring):
        x2, y2 = ring[(i + 1) % len(ring)]
        area += x1 * y2 - x2 * y1
    return abs(area) / 2


def path_from_rings(rings: list[list[tuple[float, float]]]) -> str:
    parts: list[str] = []
    for ring in rings:
        if len(ring) < 4:
            continue
        cmds = [f"M{ring[0][0]} {ring[0][1]}"]
        cmds.extend(f"L{x} {y}" for x, y in ring[1:])
        cmds.append("Z")
        parts.append(" ".join(cmds))
    return " ".join(parts)


def centroid(rings: list[list[tuple[float, float]]]) -> tuple[float, float]:
    best = max(rings, key=ring_area)
    xs = [p[0] for p in best]
    ys = [p[1] for p in best]
    return round(sum(xs) / len(xs), 1), round(sum(ys) / len(ys), 1)


def geometry_rings(geom) -> list[list[tuple[float, float]]]:
    rings: list[list[tuple[float, float]]] = []
    polys = [geom["coordinates"]] if geom["type"] == "Polygon" else geom["coordinates"]
    for poly in polys:
        projected = []
        for ring in poly[:1]:
            geo = simplify([(lon, lat) for lon, lat in ring], EPS)
            pts = [project(lon, lat) for lon, lat in geo]
            pts = [(round(x), round(y)) for x, y in pts]
            collapsed: list[tuple[float, float]] = []
            for pt in pts:
                if not collapsed or pt != collapsed[-1]:
                    collapsed.append(pt)
            if len(collapsed) >= 4:
                projected.append(collapsed)
        if projected and ring_area(projected[0]) > 120:
            rings.extend(projected)
    return rings


def main() -> None:
    data = json.loads(SRC.read_text(encoding="utf-8"))
    rows = []
    for feature in data["features"]:
        props = feature["properties"]
        uf = props["sigla"]
        rings = geometry_rings(feature["geometry"])
        if not rings:
            continue
        cx, cy = centroid(rings)
        rows.append(
            {
                "id": uf,
                "nome": props["name"],
                "regiao": REGIAO[uf],
                "d": path_from_rings(rings),
                "cx": cx,
                "cy": cy,
            }
        )
    rows.sort(key=lambda item: item["id"])
    lines = [
        "export type BrazilUf = {",
        "  id: string;",
        "  nome: string;",
        "  regiao: string;",
        "  d: string;",
        "  cx: number;",
        "  cy: number;",
        "};",
        "",
        'export const brazilViewBox = "0 0 820 760";',
        "",
        "export const brazilUfs: BrazilUf[] = [",
    ]
    for row in rows:
        lines.append(
            "  {"
            f' id: "{row["id"]}", nome: "{row["nome"]}", regiao: "{row["regiao"]}",'
            f' cx: {row["cx"]}, cy: {row["cy"]},'
            f' d: "{row["d"]}"'
            " },"
        )
    lines.append("];")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"{len(rows)} UFs -> {OUT} ({OUT.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
