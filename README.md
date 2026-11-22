# Personal-Website

<!-- where-it-runs: made by Infra/scripts/readmes.py from Infra/services.yaml; edit the entry there, not here -->
## Where it runs

**website** (web-app, production): Personal website (Next.js) with the CV link tracking and its admin links dashboard.

| | |
|---|---|
| Runs | k8s apps/Deployment website on moudimash99 (server) |
| Address | https://machaka.net; https://mohammad.machaka.net |
| Deploy | On the server: build from ~/Personal-Website (tag = commit), `docker save <image> \| sudo k3s ctr images import -`, set the tag in website.yaml, kubectl apply. Back: set the older tag (2026-10-29, 2026-10-28, 2026-10-24 are still on the server). |
| Manifest | Infra/k8s/apps/website/website.yaml |
| Image | personal-website, built on the server from ~/Personal-Website (pull Never) |
| Data | hostPath /home/moudimash99/Personal-Website/tracking-data on the server (link tracking files); Secret apps/website-env (ADMIN_KEY) |
| Check | Pod Ready (tcpSocket :3000 readiness/liveness); https://machaka.net answers 200 (checked 2026-11-20) |

From the home's service catalog, [Infra/services.yaml](https://github.com/moudimash99/Infra/blob/main/services.yaml) (entries `website`). What runs right now,
its health, and code here that is not deployed yet: `python scripts/status.py` in the Infra repo.
<!-- /where-it-runs -->
