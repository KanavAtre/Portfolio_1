---
title: CodeMap
description: Semantic code search across repositories, available to Claude Code through MCP.
technologies:
  - Python
  - PostgreSQL
  - Docker
github:
image:
---

An MCP server that splits code into chunks, embeds them, and stores the vectors in PostgreSQL with pgvector. Claude and Claude Code can then search a codebase in plain language and chat about a repository.

Currently adding Kubernetes deployment, automated retrieval-accuracy evaluation, and multi-repository indexing to support larger codebases.
