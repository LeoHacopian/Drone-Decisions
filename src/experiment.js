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
const BYSTANDERS = [0, 9]


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


  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images
  });

  // Welcome screen
  // timeline.push({
  //   type: HtmlKeyboardResponsePlugin,
  //   stimulus: "<p>Welcome to Drone Decisions!<p/>",
  // });

  let buttons = ['<button class="jspsych-btn"><img src="assets/imgs/no_drone.jpg"></img></button>',
                 '<button class="jspsych-btn"><img src="assets/imgs/drone_attack.jpg"></img></button>']

  let size = ['small', 'medium-sized', 'large'];
  let sizeRelation = ['allied', 'neutral', 'rival'];
  let region = ['North America', 'South America', 'Europe', 'Africa', 'Central Asia', 'East Asia', 'Middle East'];
  let confidence = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  let bystanders = Math.floor(Math.random() * 10);
  let regionMap = ["assets/maps/ph1.png", "assets/maps/ph2.png", "assets/maps/ph3.png", "assets/maps/ph4.png", "assets/maps/ph5.png", "assets/maps/ph6.png"]

  console.log(jsPsych.timelineVariable("stimulus"))

  const drone = {
    type: HtmlButtonResponsePlugin,
    stimulus:
        function (){
          const text =`
            <div><img src='${jsPsych.timelineVariable('stimulus')}'></img></div>
            <p>Your target is located in a ${size[Math.floor(Math.random()*size.length)]} 
                ${sizeRelation[Math.floor(Math.random()*sizeRelation.length)]} country in 
                ${region[Math.floor(Math.random()*region.length)]}. There are 
                ${bystanders} bystanders in the area and you are 
                ${confidence[Math.floor(Math.random()*confidence.length)]}% confident that you have identified the correct target.</p>
            `
          return text
        }
,
    button_html: buttons,
    choices: ['Yes', 'No'],
  };

  const node = {
    timeline: [drone],
    timeline_variables: test_stimuli,
    randomize_order: true,
    repetitions: 5
  };

  timeline.push(node);


  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  //return jsPsych.data.get().localSave('csv', 'Result.csv');
}
