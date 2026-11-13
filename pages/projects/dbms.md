---
title: Relational DBMS From Scratch
description: The storage layer of a relational database, built from scratch in Java.
technologies:
  - Java
  - Buffer Manager
  - Heap File
  - Clock Replacement
github: https://github.com/KanavAtre/DBMS_Minibase_Full
image:
---

A custom buffer manager that caches disk pages in a fixed pool of memory frames, with pin and unpin tracking, dirty-page tracking, and Clock replacement to choose which page to evict. A chained hash table maps page IDs to frames for constant-time lookups.

On top of it sits a heap file layer that supports insert, delete, update, and sequential scan. Breaking the circular dependency between the disk and buffer layers took a static registry, and preferring clean pages when evicting cut down on disk writes.
