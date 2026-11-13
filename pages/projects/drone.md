---
title: Biomed Delivery Drone
description: Drone software for delivering medicine in time-critical situations.
technologies:
  - Python
  - Gazebo
  - ROS
  - Point Cloud Processing
  - C++
  - Computer Vision
  - Depth Camera
github: https://github.com/KanavAtre/Biomed_Drone
image: /assets/static/images/drone2.jpg
---

Worked on the landing decision pipeline, which uses depth camera point clouds to pick a safe landing spot and a path around obstacles. Built with ROS and tested in Gazebo simulation and on real hardware.

Tried ML inference for speed, but ended up relying mostly on heuristic algorithms for obstacle avoidance and path selection.
