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


// VARIABLES
const SIZE = ["small", "medium-sized", "large"]
const RELATION = ["allied", "neutral", "rival"]
const REGION = ["North America", "South America", "Europe", "Africa", "Central Asia", "East Asia", "the Middle East"]
const CONFIDENCE = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
const BYSTANDERS = [0, 10]


function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {

  const jsPsych = initJsPsych();
  const timeline = [];

  const test_stimuli = [
    {stimulus: "assets/maps/ph1.png"},
    {stimulus: "assets/maps/ph2.png"},
    {stimulus: "assets/maps/ph3.png"},
    {stimulus: "assets/maps/ph4.png"},
    {stimulus: "assets/maps/ph5.png"},
    {stimulus: "assets/maps/ph6.png"}
  ]

  const buttons = ['<button class="jspsych-btn"><img src="assets/imgs/no_drone.jpg"></img></button>',
                 '<button class="jspsych-btn"><img src="assets/imgs/drone_attack.jpg"></img></button>']


  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images
  });

  const drone = {
    type: HtmlButtonResponsePlugin,
    stimulus: () => {
          const text =`
            <div><img src='${jsPsych.timelineVariable('stimulus')}'></img></div>
            <p>Your target is located in a ${SIZE[randomRange(0, SIZE.length)]} 
                ${RELATION[randomRange(0, RELATION.length)]} country in 
                ${REGION[randomRange(0, REGION.length)]}. There are 
                ${randomRange(BYSTANDERS[0], BYSTANDERS[1])} bystanders in the area and you are 
                ${CONFIDENCE[randomRange(0, CONFIDENCE.length)]}% confident that you have identified the correct target.</p>
            `
          return text
        }
,
    button_html: buttons,
    choices: ['Yes', 'No'],
  };

  timeline.push({
    timeline: [drone],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 5
  })



  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  //return jsPsych.data.get().localSave('csv', 'Result.csv');
}
