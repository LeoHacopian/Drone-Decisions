/**
 * @title Drone Decisions
 * @description Given images of drone positions ready to attack, the user is required to make their best judgement based off of target location and likelihood of civilians deaths
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import FullscreenPlugin from "@jspsych/plugin-fullscreen";
import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import HtmlButtonResponse from "@jspsych/plugin-html-button-response";
import { initJsPsych } from "jspsych";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {
  const jsPsych = initJsPsych();

  const timeline = [];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: ['assets/imgs/drone.jpg', 'assets/imgs/no_drone.jpg']
  });

  // Welcome screen
  timeline.push({
    type: HtmlKeyboardResponsePlugin,
    stimulus: "<p>Welcome to Drone Decisions!<p/>",
  });

  let buttons = ['<button class="jspsych-btn"><img src="assets/imgs/no_drone.jpg"></img></button>',
                 '<button class="jspsych-btn"><img src="assets/imgs/drone_attack.jpg"></img></button>']

  let size = ['small', 'medium-sized', 'large'];
  let sizeRelation = ['allied', 'neutral', 'rival'];
  let region = ['North America', 'South America', 'Europe', 'Africa', 'Central Asia', 'East Asia', 'Middle East'];
  let confidence = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  let bystanders = Math.floor(Math.random() * 10);
  //
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: `<div><img src="assets/imgs/drone.jpg"></img></div>
    <p>Your target is located in a ${size[Math.floor(Math.random()*size.length)]} ${sizeRelation[Math.floor(Math.random()*sizeRelation.length)]} country in ${region[Math.floor(Math.random()*region.length)]}. There are ${bystanders} bystanders in the area and you are ${confidence[Math.floor(Math.random()*confidence.length)]}% confident that you have identified the correct target.</p>
    `,
    button_html: buttons,
    choices: ['Yes', 'No'],
  });

  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  return jsPsych.data.get().localSave('csv', 'Result.csv');
}
