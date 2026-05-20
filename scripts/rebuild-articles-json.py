#!/usr/bin/env python3
"""Regenera content/blog/articles.json com slugs de artigos publicados."""
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG_DIR = os.path.join(ROOT, "content", "blog")


def main():
    slugs = []
    for name in sorted(os.listdir(BLOG_DIR)):
        if not name.endswith(".md"):
            continue
        path = os.path.join(BLOG_DIR, name)
        with open(path, encoding="utf-8") as f:
            text = f.read()
        if not text.strip():
            continue
        match = re.match(r"^---\r?\n([\s\S]*?)\r?\n---", text)
        if not match:
            continue
        status = "draft"
        for line in match.group(1).splitlines():
            if line.strip().startswith("status:"):
                status = line.split(":", 1)[1].strip().strip('"')
        if status == "published":
            slugs.append(name[:-3])

    out_path = os.path.join(BLOG_DIR, "articles.json")
    with open(out_path, "w", encoding="utf-8") as out:
        json.dump(slugs, out, indent=2, ensure_ascii=False)
        out.write("\n")
    print("articles.json:", slugs)


if __name__ == "__main__":
    main()
