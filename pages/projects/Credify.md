---
title: Credify
description: Chrome extension that scores the credibility of Reddit posts in real time.
technologies:
  - JavaScript
  - Chrome Extensions
  - uAgents
  - LangChain
  - MutationObserver
  - Python
github: https://github.com/KanavAtre/MutationObserve
image: assets/static/images/credify.jpeg
---

A multi-agent backend built on Fetch.ai uAgents gathers live context for a post, retrieves related New York Times coverage, and has an LLM score credibility against a JSON schema. Results are served over a REST API.

A Manifest V3 extension watches Reddit with a MutationObserver and injects a React dashboard into each post, caching analyses so repeat views are instant.
