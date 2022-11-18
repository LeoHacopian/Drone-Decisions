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
const RELATION = ["allied", "neutral", "rival"]
const REGION = ["North America", "South America", "Europe", "Africa", "Central Asia", "East Asia", "the Middle East"]
const CONFIDENCE = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]
// const SIZE = ["small", "medium-sized", "large"]
// const BYSTANDERS = [0, 10]


function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({ assetPaths, input = {}, environment, title, version }) {

  const jsPsych = initJsPsych({
    on_finish: function() {
      jsPsych.data.displayData()
    }
  });
  
  const timeline = [];


  let rand
  const test_stimuli = [
    {
      // TODO: Add zero bystander images
      stimulus: `assets/maps/Big City A/BCA ${rand = randomRange(0,11)}@4x.png`, 
      size: "large",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Big City B/BCB ${rand = randomRange(0,11)}@4x.png`, 
      size: "large",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Small City A/SCA ${rand = randomRange(0,11)}@4x.png`, 
      size: "small",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Small City B/SCB ${rand = randomRange(0,11)}@4x.png`, 
      size: "small",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Topo A/Topo A ${rand = randomRange(0,11)}@4x.png`, 
      size: "medium-sized",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Topo B/Topo B ${rand = randomRange(0,11)}@4x.png`, 
      size: "medium-sized",
      bystanders: rand,
    },
  ]

  const buttons = ['<button class="jspsych-btn"><img src="assets/imgs/no_drone_small.png"></img></button>',
                 '<button class="jspsych-btn"><img src="assets/imgs/drone_attack_small.png"></img></button>']


  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images
  });

  const drone = {
    type: HtmlButtonResponsePlugin,
    stimulus: () => {
          const text =`
            <div><img id="map-img" src='${jsPsych.timelineVariable('stimulus')}'></img></div>
            <p>Your target is located in a ${jsPsych.timelineVariable('size')} 
                ${RELATION[randomRange(0, RELATION.length)]} country in 
                ${REGION[randomRange(0, REGION.length)]}. There are 
                ${jsPsych.timelineVariable('bystanders')} bystanders in the area and you are 
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

    // Custom function to randomize the order of images
    sample: {
      type: 'custom',
      size: 7,
      fn: function(arr) {
        const len = arr.length

        const result = []
        for (let i = 0; i < this.size; i++) {
          const num = randomRange(0, len)
          result.push(num)
        }

        // console.log(result)
        return result
      }
    }
  })



  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  //return jsPsych.data.get().localSave('csv', 'Result.csv');
}
