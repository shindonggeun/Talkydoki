import { createGlobalStyle } from "styled-components";

export const JandiStyle = createGlobalStyle`
.react-calendar-heatmap {
  height: 90%;
}

.react-calendar-heatmap text {
  font-size: 8pt;
  fill: var(--text);
  opacity: 0.5;
}

.react-calendar-heatmap .react-calendar-heatmap-small-text {
  font-size: 5px;
}


.react-calendar-heatmap rect:hover {
  stroke: #555;
  stroke-width: 1px;
}

/*
 * Default color scale
 */

.react-calendar-heatmap .color-empty {
  fill: var(--shadow);
  opacity: 0.2;
}

.react-calendar-heatmap .color-filled {
  fill: var(--main);
}

/*
 * Github color scale
 */

.react-calendar-heatmap .color-github-0 {
  fill: var(--bg);
}
.react-calendar-heatmap .color-github-1 {
  fill:  var(--shadow);
}
.react-calendar-heatmap .color-github-2 {
  fill: var(--main-light);
}
.react-calendar-heatmap .color-github-3 {
  fill: var(--main);
}
.react-calendar-heatmap .color-github-4 {
  fill: var(--main-dark);
}

/*
 * Gitlab color scale
 */

.react-calendar-heatmap .color-gitlab-0 {
  fill: #ededed;
}
.react-calendar-heatmap .color-gitlab-1 {
  fill: #acd5f2;
}
.react-calendar-heatmap .color-gitlab-2 {
  fill: #7fa8d1;
}
.react-calendar-heatmap .color-gitlab-3 {
  fill: #49729b;
}
.react-calendar-heatmap .color-gitlab-4 {
  fill: #254e77;
}

`;
