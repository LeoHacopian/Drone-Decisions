/**
 * @title Drone Decisions
 * @description Given images of drone positions ready to attack, the user is required to make their best judgement based off of target location and likelihood of civilians deaths
 * @version 0.1.0
 *
 * @assets assets/
 */

// You can import stylesheets (.scss or .css).
import "../styles/main.scss";

import HtmlKeyboardResponsePlugin from "@jspsych/plugin-html-keyboard-response";
import HtmlButtonResponse from "@jspsych/plugin-html-button-response";
import PreloadPlugin from "@jspsych/plugin-preload";
import { initJsPsych } from "jspsych";
import HtmlButtonResponsePlugin from "@jspsych/plugin-html-button-response";

// VARIABLES
const RELATION = ["allied", "neutral", "rival"];
const REGION = [
  "North America",
  "South America",
  "Europe",
  "Africa",
  "Central Asia",
  "East Asia",
  "the Middle East",
];
const CONFIDENCE = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
];
// const SIZE = ["small", "medium-sized", "large"]
// const BYSTANDERS = [0, 10]

/* GLOBAL FUNCTIONS */

/**
 *
 * @param {int} min Minimum value for range (inclusive)
 * @param {int} max Maximum value for range (exclusive)
 * @returns Random integer value
 */
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * This function will be executed by jsPsych Builder and is expected to run the jsPsych experiment
 *
 * @type {import("jspsych-builder").RunFunction}
 */
export async function run({
  assetPaths,
  input = {},
  environment,
  title,
  version,
}) {
  // Initialize jsPsych variable
  const jsPsych = initJsPsych({
    // Function to be called when experiment finishes
    on_finish: function () {
      jsPsych.data.displayData();
    },
  });

  // Array storing order of trials
  const timeline = [];

  // Environment Variables
  let rand;
  const env_vars = [
    // TODO: Add zero bystander images
    {
      stimulus: `assets/maps/Big City A/BCA ${(rand = randomRange(
        0,
        11
      ))}@4x.png`,
      size: "large",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Big City B/BCB ${(rand = randomRange(
        0,
        11
      ))}@4x.png`,
      size: "large",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Small City A/SCA ${(rand = randomRange(
        0,
        11
      ))}@4x.png`,
      size: "small",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Small City B/SCB ${(rand = randomRange(
        0,
        11
      ))}@4x.png`,
      size: "small",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Topo A/Topo A ${(rand = randomRange(
        0,
        11
      ))}@4x.png`,
      size: "medium-sized",
      bystanders: rand,
    },
    {
      stimulus: `assets/maps/Topo B/Topo B ${(rand = randomRange(
        0,
        11
      ))}@4x.png`,
      size: "medium-sized",
      bystanders: rand,
    },
  ];

  // Preload assets
  timeline.push({
    type: PreloadPlugin,
    images: assetPaths.images,
  });

  // HTML Variables
  const titleHtml = `<h1 id="title">TECHOMETER</h1>`;

  // buttons for attack and don't-attack 
  const gameButtons = [
    '<button class="trialButton gameButton"><img src="assets/imgs/no_drone_small.png"></img></button>',
    '<button class="trialButton gameButton"><img src="assets/imgs/drone_attack_small.png"></img></button>',
  ];

  const consentButton = [`<button id="consentButton" class="trialButton"><p>I agree to participate in this study</p></button>`]

  // Instructions
  timeline.push({
    type: HtmlButtonResponsePlugin,
    stimulus: `
    ${titleHtml}
    <div class="Inner BorderColor TB"> <div class="InnerInner BorderColor">  <div class="QuestionText BorderColor"><div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>California State University, Northridge</strong></span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>CONSENT TO ACT AS A HUMAN RESEARCH PARTICIPANT</strong></span></span></span></div>
    <div style="text-align: center;">&nbsp;</div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>Decision-making Study</strong></span></span></span></div>
    <div style="text-align: center;">&nbsp;</div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">You are being asked to participate in a research study.&nbsp; Participation in this study is completely voluntary.&nbsp; Please read the information below before deciding if you want to participate. </span></span></span></div>
    <div style="text-align: center;">&nbsp;</div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>RESEARCH TEAM</strong></span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">Researcher:</span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">Dr. Abraham M. Rutchick</span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">Department of Psychology</span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">18111 Nordhoff St.</span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">Northridge, CA 91330-9255</span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">(818)677-7140</span></span></span></div>
    <div style="text-align: center;"><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">rutchick@csun.edu</span></span></span></div>
    <div style="text-align: center;">&nbsp;</div>
    <div style="text-align: left">
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>PURPOSE OF STUDY</strong>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">This study is designed to understand how people make various kinds of decisions.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>SUBJECTS</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><em>Inclusion Requirements</em></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">You are eligible to participate in this study if you are at least 18 years of age or older.</span></span></span></div>
      &nbsp;
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>TIME COMMITMENT</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">This study will involve approximately 7 minutes of your time.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>PROCEDURES</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">The following procedures will occur:</span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">This&nbsp;study requires you to read a series of vignettes and to answer&nbsp;questions regarding what you have read.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>RISKS AND DISCOMFORTS</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">This study involves no more than minimal risk.&nbsp; There are no known harms or discomforts associated with this study beyond those encountered in normal daily life. It is possible that participants will experience some disappointment or regret when contemplating their behavior. To minimize risk, participants may stop their participation at any time they experience discomfort.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>BENEFITS</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><em>Subject Benefits</em></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">The possible benefits you may experience from the procedures described in this study include a better understanding of the psychological research process.</span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><em>Benefits to Others or Society</em></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">Researchers can better understand the human decision-making process and the factors that influence those decisions.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>ALTERNATIVES TO PARTICIPATION</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">The only alternative to participation in this study is not to participate.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>COMPENSATION, COSTS AND REIMBURSEMENT</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">You will receive $0.50 upon completion of the survey.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>CONFIDENTIALITY</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><em>Subject Identifiable Data</em></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">All identifiable information that will be collected about you will be removed at the end of data collection and replaced with a code. A list linking the code and your identifiable information will be securely kept separate from the research data.&nbsp;</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>DATA STORAGE</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">All research data will be stored on password-protected computers.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>DATA ACCESS</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">The researcher named on the first page of this form and his laboratory team will have access to your study records.&nbsp; Any information derived from this research project that personally identifies you will not be voluntarily released or disclosed without your separate consent, except as specifically required by law. Publications and/or presentations that result from this study will not include identifiable information about you.</span></span></span></div>
      <div><br>    <span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>DATA RETENTION</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">The researchers intend to keep the de-identified data indefinitely.</span></span></span></div>
      <div>&nbsp;</div>
      &nbsp;
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>IF YOU HAVE QUESTIONS</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">If you have any comments, concerns, or questions regarding the conduct of this research please contact the research team listed on the first page of this form.</span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">If you have concerns or complaints about the research study, research team, or questions about your rights as a research participant, please contact Research and Sponsored Projects, 18111 Nordhoff Street, California State University, Northridge, Northridge, CA 91330-8232, or phone 818-677-2901.</span></span></span></div>
      <div>&nbsp;</div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;"><strong>VOLUNTARY PARTICIPATION STATEMENT</strong></span></span></span></div>
      <div><span style="font-family:arial,helvetica,sans-serif;"><span style="font-size:16px;"><span style="color:#000000;">You should not sign this form unless you have read and understood it. Participation in this study is voluntary.&nbsp; You may refuse to answer any question or discontinue your involvement at any time without penalty or loss of benefits to which you might otherwise be entitled.&nbsp; Your decision will not affect your relationship with California State University, Northridge.&nbsp; </span></span></span></div></div><div class="QuestionBody"></div>  </div> </div>
    </div>
    <legend> <div class="QuestionText BorderColor" style="text-align: left; padding: 30px 0px"><span style="font-family:arial,helvetica,sans-serif;"><span style="color:#000000;"><span style="font-size:16px;">I have read the above information and hereby consent to participate in this study.</span></span></span></div></legend>
    `,

    button_html: consentButton,
    choices: ["agree"],
  });

  
  // Main Drone Trial
  const drone = {
    type: HtmlButtonResponsePlugin,
    stimulus: () => {
      const text = `
            <div id="trial-container" class="droneTrial">
              ${titleHtml}
              <div><img id="map-img" src='${jsPsych.timelineVariable(
                "stimulus"
              )}'></img></div>
              <p id="question-text">Your target is located in a ${jsPsych.timelineVariable(
                "size"
              )} 
                  ${RELATION[randomRange(0, RELATION.length)]} country in 
                  ${REGION[randomRange(0, REGION.length)]}. There are 
                  ${jsPsych.timelineVariable(
                    "bystanders"
                  )} bystanders in the area and you are 
                  ${
                    CONFIDENCE[randomRange(0, CONFIDENCE.length)]
                  }% confident that you have identified the correct target.</p>
            </div>
          `;
      return text;
    },
    button_html: gameButtons,
    choices: ["Yes", "No"],
  };

  // Push Trials, set timeline variables, and set sampling function
  timeline.push({
    timeline: [drone],
    timeline_variables: env_vars,

    // Custom function to randomize the order of images
    sample: {
      type: "custom",
      size: 7,
      fn: function (arr) {
        return randomizeStimuli(arr.length, this.size);
      },
    },
  });

  /**
   *
   * @param {int} range Size of the stimuli array
   * @param {int} repitions Number of times stimuli should be shown
   * @returns Array containing order of indexes of stimuli
   */
  function randomizeStimuli(range, repitions) {
    const result = [];
    for (let i = 0; i < repitions; i++) {
      const num = randomRange(0, range);
      result.push(num);
    }
    return result;
  }

  // Run experiment
  await jsPsych.run(timeline);

  // Return the jsPsych instance so jsPsych Builder can access the experiment results (remove this
  // if you handle results yourself, be it here or in `on_finish()`)
  //return jsPsych.data.get().localSave('csv', 'Result.csv');
}
