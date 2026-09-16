# Da Huang | 黄达

Personal academic homepage for Da Huang, a Ph.D. student at Shanghai Innovation Institute and Shanghai Jiao Tong University. Built with static HTML, CSS, and JavaScript; no build step is required.

## Public Website

Once GitHub Pages is enabled, visitors can read the homepage at:

**https://hddd16988.github.io/huangda.github.io/**

One-time setup for the repository owner:

1. Open [Settings → Pages](https://github.com/HDDD16988/huangda.github.io/settings/pages).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select **main** and **/ (root)**, then click **Save**.
4. Wait for the Pages deployment to finish; the published URL will appear in Settings → Pages.

Later changes pushed to `main` will be published automatically. Visitors do not need Git, Python, or any command-line tools.

## Local Preview (for editing only)

Open `index.html` directly, or serve this directory:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

Then visit http://127.0.0.1:8080/.

## Files

- `index.html`: biography, contact links, news, publications, education, projects, service, and awards.
- `stylesheet.css`: base template styles.
- `profile.css`: responsive layout, white publication cards, and institution logos.
- `profile.js`: publication filters, author expansion, pipeline viewer, clipboard actions, and back-to-top.
- `documents/`: linked CV and PDF manuscripts for CoM-HOI, Schrödinger's Navigator, and TP-MDDN. TrajBooster links directly to arXiv.
- `images/profile/`: the author's supplied high-resolution portrait.
- `images/institutions/`: supplied SII and SJTU logos.
- `images/paper/`: pipeline figures for the four displayed papers.
- `images/experience/`: the supplied night skyline photograph, optimized as JPEG and responsive WebP images.
- `images/icon/`: cursor assets used by the template.

The page uses relative asset paths so it works locally and under a GitHub Pages project path. Desktop content is 1100px wide with 40% of publication rows allocated to images; mobile layouts stack images above text.

## Updating Content

Edit the corresponding section in `index.html`. Each publication row has a unique `id` and comma-separated `data-tags`; filter counts update automatically. Use `†` for equal contribution and `*` for corresponding authors. Pipeline links use the `pipeline-link` class and a `data-title` for the image viewer.

When replacing the footer image, update both the JPEG fallback and all WebP paths in its `<picture>` element. Preserve the aspect ratio of portraits, logos, and pipeline figures.

## Sources

Biography and education draw on the supplied CV and subsequent author updates. Manuscript author lists, acceptance dates, and contact links reflect the author's provided information. Publication summaries are condensed from the abstracts.

Pipeline figures are cropped from the supplied PDFs and rendered at three pixels per PDF point:

- CoM-HOI: Figure 3, page 4.
- Schrödinger's Navigator: Figure 2, page 3.
- TrajBooster: Figure 1, page 1 of `2509.11839v3.pdf`.
- TP-MDDN: Figure 2, page 4.

TrajBooster's author list and Paper, Code, Model, and Dataset links were checked against its [project homepage](https://jiachengliu3.github.io/TrajBooster/). Its Code link uses the current [OpenHelix-Team/OpenTrajBooster](https://github.com/OpenHelix-Team/OpenTrajBooster) repository.

Unused template illustrations and removed publication assets are excluded from this website. Original research materials and interview-preparation documents are maintained separately.

## Credits

Adapted from the existing personal homepage template, which credits [Audio-Interaction](https://xzf-thu.github.io/Audio-Interaction/), Claude Code, and Codex.
