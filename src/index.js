/* jshint browser: true, esversion: 5, asi: true */
/*globals Vue, uibuilder */
// @ts-nocheck
/*
  Copyright (c) 2019 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
"use strict";

/** @see https://github.com/TotallyInformation/node-red-contrib-uibuilder/wiki/Front-End-Library---available-properties-and-methods */

// eslint-disable-next-line no-unused-vars
var app1 = new Vue({
  el: "#app",
  data: {
    startMsg: "Vue has started, waiting for messages",
    feVersion: "",
    counterBtn: 0,
    inputText: null,
    inputChkBox: false,
    socketConnectedState: false,
    serverTimeOffset: "[unknown]",
    imgProps: { width: 75, height: 75 },

    msgRecvd: "[Nothing]",
    msgsReceived: 0,
    msgCtrl: "[Nothing]",
    msgsControl: 0,

    msgSent: "[Nothing]",
    msgsSent: 0,
    msgCtrlSent: "[Nothing]",
    msgsCtrlSent: 0,
    isBusy: false,
    acciones: {
      strike: "strike",
      spare: "spare",
      espera: "espera",
      tiro: "tiro",
      bolaFuera: "fuera",
      finalizado: 0,
    },
    gifs: {
      strike: {
        src: "./images/strikeGif.gif",
      },
      spare: {
        src: "./images/spare.gif",
      },
      bolaFuera: {
        src: "./images/bola-fuera.gif",
      },
      espera: {
        src: "./images/espera.gif",
      },
      tiro: {
        src: "./images/tiro.gif",
      },
    },
    ganador: "",
    values: {
      open: null,
      players: 0,
      jugadorlanza: "",
      accion: "",
      jugador1nombre: "",
      jugador1puntostiro: "",
      jugador1puntostotales: "",
      jugador2nombre: "",
      jugador2puntostiro: "",
      jugador2puntostotales: "",
      jugador3nombre: "",
      jugador3puntostiro: "",
      jugador3puntostotales: "",
      jugador4nombre: "",
      jugador4puntostiro: "",
      jugador4puntostotales: "",
      jugador5nombre: "",
      jugador5puntostiro: "",
      jugador5puntostotales: "",
      jugador6nombre: "",
      jugador6puntostiro: "",
      jugador6puntostotales: "",
    },
    statusPinos: [true, true, true, true, true, true, true, true, true, false], // el status de los pinos
    divPinosOculto: true,
    // mapaTopics: {
    //     'pista1/open' : 'p1open', 'pista1/players' : 'p1players', 'pista1/jugadorlanza' : 'p1lanza', 'pista1/accion' : 'p1accion',
    //     'pista1/jugador1/nombre' : 'p1j1nombre', 'pista1/jugador1/puntostiro' : 'p1j1puntostiro', 'pista1/jugador1/puntostotales' : 'p1j1puntostotales',
    //     'pista1/jugador2/nombre' : 'p1j2nombre', 'pista1/jugador2/puntostiro' : 'p1j2puntostiro', 'pista1/jugador2/puntostotales' : 'p1j2puntostotales',
    //     'pista1/jugador3/nombre' : 'p1j3nombre', 'pista1/jugador3/puntostiro' : 'p1j3puntostiro', 'pista1/jugador3/puntostotales' : 'p1j3puntostotales',
    //     'pista1/jugador4/nombre' : 'p1j4nombre', 'pista1/jugador4/puntostiro' : 'p1j4puntostiro', 'pista1/jugador4/puntostotales' : 'p1j4puntostotales',
    //     'pista1/jugador5/nombre' : 'p1j5nombre', 'pista1/jugador5/puntostiro' : 'p1j5puntostiro', 'pista1/jugador5/puntostotales' : 'p1j5puntostotales',
    //     'pista1/jugador6/nombre' : 'p1j6nombre', 'pista1/jugador6/puntostiro' : 'p1j6puntostiro', 'pista1/jugador6/puntostotales' : 'p1j6puntostotales',
    // },
    itemBase: {
      player: "",
      actual: "primero",
      primero: { first: 0, second: 0, score: 0 },
      segundo: { first: 0, second: 0, score: 0 },
      tercero: { first: 0, second: 0, score: 0 },
      cuarto: { first: 0, second: 0, score: 0 },
      quinto: { first: 0, second: 0, score: 0 },
      sexto: { first: 0, second: 0, score: 0 },
      septimo: { first: 0, second: 0, score: 0 },
      octavo: { first: 0, second: 0, score: 0 },
      noveno: { first: 0, second: 0, score: 0 },
      decimo: { first: 0, second: 0, third: 0 },
      final: 0,
    },
    items: [
      //   { 'player': 'Dickerson Macdonald', 'actual': 'primero', 'primero':{first:0, second:0, score:0},  'segundo':{first:0 ,second:0, score:0}, 'tercero':{first:0 ,second:0, score:0}, 'cuarto':{first:0 ,second:0, score:0}, 'quinto':{first:0 ,second:0, score:0}, 'sexto':{first:0 ,second:0, score:0}, 'septimo':{first:0 ,second:0, score:0}, 'octavo':{first:0 ,second:0, score:0}, 'noveno':{first:0 ,second:0, score:0}, 'decimo':{first:0, second:0, third:0}, 'final':0 },
      //   { 'player': 'Larsen Shaw', 'actual': 'primero', 'primero':{first:0, second:0, score:0},  'segundo':{first:0 ,second:0, score:0}, 'tercero':{first:0 ,second:0, score:0}, 'cuarto':{first:0 ,second:0, score:0}, 'quinto':{first:0 ,second:0, score:0}, 'sexto':{first:0 ,second:0, score:0}, 'septimo':{first:0 ,second:0, score:0}, 'octavo':{first:0 ,second:0, score:0}, 'noveno':{first:0 ,second:0, score:0}, 'decimo':{first:0, second:0, third:0}, 'final':0 },
      //   { 'player': 'Geneva Wilson', 'actual': 'primero', 'primero':{first:0, second:0, score:0},  'segundo':{first:0 ,second:0, score:0}, 'tercero':{first:0 ,second:0, score:0}, 'cuarto':{first:0 ,second:0, score:0}, 'quinto':{first:0 ,second:0, score:0}, 'sexto':{first:0 ,second:0, score:0}, 'septimo':{first:0 ,second:0, score:0}, 'octavo':{first:0 ,second:0, score:0}, 'noveno':{first:0 ,second:0, score:0}, 'decimo':{first:0, second:0, third:0}, 'final':0 },
      //   { 'player': 'Jami Carney', 'actual': 'primero', 'primero':{first:0, second:0, score:0},  'segundo':{first:0 ,second:0, score:0}, 'tercero':{first:0 ,second:0, score:0}, 'cuarto':{first:0 ,second:0, score:0}, 'quinto':{first:0 ,second:0, score:0}, 'sexto':{first:0 ,second:0, score:0}, 'septimo':{first:0 ,second:0, score:0}, 'octavo':{first:0 ,second:0, score:0}, 'noveno':{first:0 ,second:0, score:0}, 'decimo':{first:0, second:0, third:0}, 'final':0 },
      //   { 'player': 'Larsen Shadow', 'actual': 'primero', 'primero':{first:0, second:0, score:0},  'segundo':{first:0 ,second:0, score:0}, 'tercero':{first:0 ,second:0, score:0}, 'cuarto':{first:0 ,second:0, score:0}, 'quinto':{first:0 ,second:0, score:0}, 'sexto':{first:0 ,second:0, score:0}, 'septimo':{first:0 ,second:0, score:0}, 'octavo':{first:0 ,second:0, score:0}, 'noveno':{first:0 ,second:0, score:0}, 'decimo':{first:0, second:0, third:0}, 'final':0 },
      //   { 'player': 'Paul mc Carney', 'actual': 'primero', 'primero':{first:0, second:0, score:0},  'segundo':{first:0 ,second:0, score:0}, 'tercero':{first:0 ,second:0, score:0}, 'cuarto':{first:0 ,second:0, score:0}, 'quinto':{first:0 ,second:0, score:0}, 'sexto':{first:0 ,second:0, score:0}, 'septimo':{first:0 ,second:0, score:0}, 'octavo':{first:0 ,second:0, score:0}, 'noveno':{first:0 ,second:0, score:0}, 'decimo':{first:0, second:0, third:0}, 'final':0 },
    ],
    fields: [
      {
        key: "player",
        label: "Player",
        tdClass: ["jugador", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "primero",
        /* label:'1',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "segundo",
        /* label:'2',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "tercero",
        /* label:'3',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "cuarto",
        /* label:'4',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "quinto",
        /* label:'5',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "sexto",
        /* label:'6',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "septimo",
        /* label:'7',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "octavo",
        /* label:'8',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "noveno",
        /* label:'9',*/ tdClass: ["puntaje", "parcial", "text-center"],
        thClass: ["d-none"],
      },
      {
        key: "decimo",
        /*label:'10',*/ tdClass: [
          "puntaje",
          "parcial",
          "ultimo",
          "text-center",
        ],
        thClass: ["d-none"],
      },
      {
        key: "final",
        label: "final",
        tdClass: ["puntaje", "final", "text-center"],
        thClass: ["d-none"],
      },
    ],
  }, // --- End of data --- //
  computed: {
    hLastRcvd: function () {
      var msgRecvd = this.msgRecvd;
      if (typeof msgRecvd === "string")
        return "Last Message Received = " + msgRecvd;
      else return "Last Message Received = " + this.syntaxHighlight(msgRecvd);
    },
    hLastSent: function () {
      var msgSent = this.msgSent;
      if (typeof msgSent === "string") return "Last Message Sent = " + msgSent;
      else return "Last Message Sent = " + this.syntaxHighlight(msgSent);
    },
    hLastCtrlRcvd: function () {
      var msgCtrl = this.msgCtrl;
      if (typeof msgCtrl === "string")
        return "Last Control Message Received = " + msgCtrl;
      else
        return (
          "Last Control Message Received = " + this.syntaxHighlight(msgCtrl)
        );
    },
    hLastCtrlSent: function () {
      var msgCtrlSent = this.msgCtrlSent;
      if (typeof msgCtrlSent === "string")
        return "Last Control Message Sent = " + msgCtrlSent;
      //else return 'Last Message Sent = ' + this.callMethod('syntaxHighlight', [msgCtrlSent])
      else
        return (
          "Last Control Message Sent = " + this.syntaxHighlight(msgCtrlSent)
        );
    },
  }, // --- End of computed --- //
  methods: {
    rowClass(item) {
      if (!item || type !== "row") return "";
      if (item.activo == 1) return "tirador";
    },
    increment: function (event) {
      console.log("Button Pressed. Event DatA: ", event);

      // Increment the count by one
      this.counterBtn = this.counterBtn + 1;
      var topic = this.msgRecvd.topic || "uibuilder/vue";
      uibuilder.send({
        topic: topic,
        payload: {
          type: "counterBtn",
          btnCount: this.counterBtn,
          message: this.inputText,
          inputChkBox: this.inputChkBox,
        },
      });
    }, // --- End of increment --- //

    parseNamePlayer(name) {
      if (name.length >= 19) {
        return name.slice(0, 17) + "...";
      }
      return name;
    },

    animacionStrike() {
      var vueApp = this;
      // este es el strike que contiene el video o GIF
      let $divStrike = document.querySelector("#strike");
      let $divStrikeGif = document.querySelector("#strike img");
      // acá obtenemos todos los elementos que harán la animación de la explosión y la palabra
      let $divStrikeWord = document.querySelector("#strikeWord");
      let $divStrikeWordH1 = document.querySelector("#strikeWord h1");
      let $divStrikeWordBg = document.querySelector("#strikeWord img");
      $divStrike.classList.remove("hide");
      $divStrikeGif.classList.remove("hide");
      let v = $("#strikeVideo");

      v.attr("src", vueApp.gifs.strike.src);

      let flag = 0;

      gsap.set($divStrikeWordH1, { rotate: "330deg" });
      gsap.set($divStrikeWordBg, { rotate: "330deg" });
      gsap.to($divStrikeGif, {
        duration: 1,
        scale: 105,
        ease: "elastic", //scaleX:101, scaleY:101, ease:"elastic",
        onComplete: () => {
          // acá esperamos la reproducción del video y o bien seguimos con más animaciones, o bien ocultamos el div nuevamente
        },
      });
      setTimeout(() => {
        gsap.fromTo(
          $divStrikeWordBg,
          /* from */
          {
            scale: 0.01,
          },
          /* To */
          {
            duration: 0.5,
            scale: 2,
            ease: "expo",
            onStart: () => {
              $divStrikeWordBg.classList.remove("hide");
            },
          }
        );
        gsap.fromTo(
          $divStrikeWordH1,
          {
            scale: 6,
          },
          {
            duration: 1,
            delay: 0.1,
            scale: 1.8,
            ease: "bounce",
            onStart: () => {
              $divStrikeWord.classList.remove("hide");
            },
            onComplete: () => {
              setTimeout(() => {
                $divStrike.classList.add("hide");
                $divStrikeGif.classList.add("hide");
                $divStrikeGif.style.transform = null;
                $divStrikeWord.classList.add("hide");
                $divStrikeWordBg.classList.add("hide");
                v.attr("src", null);
              }, 2000);
            },
          }
        );
      }, 3600);
    },

    animacionSpare() {
      var vueApp = this;
      // este es el strike que contiene el video o GIF
      let $divSpare = document.querySelector("#spare");
      let $divSpareGif = document.querySelector("#spare img");
      // acá obtenemos todos los elementos que harán la animación de la explosión y la palabra
      let $divSpareWord = document.querySelector("#spareWord");
      let $divSpareWordH1 = document.querySelector("#spareWord h1");
      let $divSpareWordBg = document.querySelector("#spareWord img");
      $divSpare.classList.remove("hide");
      $divSpareGif.classList.remove("hide");

      let v = $("#spareVideo");
      v.attr("src", vueApp.gifs.spare.src);

      gsap.set($divSpareWordH1, { rotate: "330deg" });
      gsap.set($divSpareWordBg, { rotate: "330deg" });

      gsap.to(
        $divSpareGif,
        { duration: 2, scale: 105, ease: "elastic" } //scaleX:101, scaleY:101, ease:"elastic",
      );
      setTimeout(() => {
        gsap.fromTo(
          $divSpareWordBg,
          /* from */
          {
            scale: 0.01,
          },
          /* To */
          {
            duration: 0.5,
            scale: 2,
            ease: "expo",
            onStart: () => {
              $divSpareWordBg.classList.remove("hide");
            },
          }
        );
        gsap.fromTo(
          $divSpareWordH1,
          {
            scale: 6,
          },
          {
            duration: 1,
            delay: 0.1,
            scale: 1.8,
            ease: "elastic",
            onStart: () => {
              $divSpareWord.classList.remove("hide");
            },
            onComplete: () => {
              setTimeout(() => {
                $divSpare.classList.add("hide");
                $divSpareGif.classList.add("hide");
                $divSpareGif.style.transform = null;
                $divSpareWord.classList.add("hide");
                $divSpareWordBg.classList.add("hide");
                v.attr("src", null);
              }, 2000);
            },
          }
        );
      }, 3100);
    },

    animacionFinish() {
      // este es el strike que contiene el video o GIF
      let $divFinish = document.querySelector("#finish");
      let $divFinishGif = document.querySelector("#finish img");
      // acá obtenemos todos los elementos que harán la animación de la explosión y la palabra
      let $divFinishWord = document.querySelector("#finishWord");
      let $divFinishWordText = document.querySelector("#finishWord .textos");
      //Contenedor del fondo
      $divFinish.classList.remove("hide");
      // GIF
      $divFinishGif.classList.remove("hide");

      gsap.fromTo(
        $divFinishGif,
        { scaleX: 1, scaleY: 1 },
        { duration: 0.75, scaleX: 105, scaleY: 110, ease: "expo" }
      );
      gsap.from($divFinishWordText, {
        duration: 1,
        scale: 0.01,
        ease: "expo",
        onStart: () => {
          $divFinishWord.classList.remove("hide");
        },
      });
    },

    animacionBolaFuera() {
      var vueApp = this;

      let $divBolaFuera = document.querySelector("#bolaFuera");
      let $divBolaFueraGif = document.querySelector("#bolaFuera img");

      let $divBolaFueraWord = document.querySelector("#bolaFueraWord");
      let $divBolaFueraWordH1 = document.querySelector("#bolaFueraWord h1");

      $divBolaFuera.classList.remove("hide");

      let v = $("#bolaFueraVideo");
      v.attr("src", vueApp.gifs.bolaFuera.src);

      gsap.fromTo(
        $divBolaFueraGif,
        { scaleX: 1, scaleY: 1 },
        {
          duration: 2,
          scale: 105,
          ease: "elastic", //scaleX:101, scaleY:101, ease:"elastic",
          onComplete: () => {
            // acá esperamos la reproducción del video y o bien seguimos con más animaciones, o bien ocultamos el div nuevamente
            setTimeout(() => {
              $divBolaFuera.classList.add("hide");
              $divBolaFueraWord.classList.add("hide");
              v.attr("src", null);
            }, 1650);
          },
        }
      );
      // la animacion durará x segundos, durante esos x segundos se esperará hasta que termine la animación
      // y luego se ejecuta durante un segundo la aparición del texto,
      setTimeout(() => {
        gsap.fromTo(
          $divBolaFueraWordH1,
          { scale: 0.1 },
          {
            duration: 1,
            scale: 1.2,
            ease: "expo",
            onStart: () => {
              $divBolaFueraWord.classList.remove("hide");
            },
          }
        );
      }, 2000);
    },

    // Espera
    animacionEspera() {
      console.log("entro");
      var vueApp = this;

      // este es el strike que contiene el video o GIF
      let $divEspera = document.querySelector("#espera");
      let $divEsperaGif = document.querySelector("#espera img");
      let $divEsperaWord = document.querySelector("#esperaWord");
      let $divEsperaWordH1 = document.querySelector("#esperaWord h1");
      $divEspera.classList.remove("hide");

      let v = $("#esperaVideo");
      v.attr("src", vueApp.gifs.espera.src);

      gsap.fromTo(
        $divEsperaGif,
        { scaleX: 1, scaleY: 1 },
        { duration: 2, scaleX: 101, scaleY: 120, ease: "elastic" }
      );
      setTimeout(() => {
        gsap.fromTo(
          $divEsperaWordH1,
          { scale: 0.1 },
          {
            duration: 1,
            scale: 1.5,
            ease: "expo",
            onStart: () => {
              $divEsperaWord.classList.remove("hide");
            },
          }
        );
      }, 500);
    },

    ocultarEspera() {
      let v = $("#esperaVideo");
      let $divEspera = document.querySelector("#espera");
      let $divEsperaGif = document.querySelector("#espera img");
      let $divEsperaWord = document.querySelector("#esperaWord");
      $divEspera.classList.add("hide");
      $divEsperaWord.classList.add("hide");
      v.attr("src", null);
    },

    // se pisa la línea
    animacionTiro() {
      var vueApp = this;
      vueApp.ocultarEspera();
      // este es el strike que contiene el video o GIF
      let $divTiro = document.querySelector("#tirar");
      let $divTiroGif = document.querySelector("#tirar img");
      // acá obtenemos todos los elementos que harán la animación de la explosión y la palabra
      let $divTiroWord = document.querySelector("#tirarWord");
      let $divTiroWordH1 = document.querySelector("#tirarWord h1");

      $divTiro.classList.remove("hide");

      let v = $("#tirarVideo");
      v.attr("src", vueApp.gifs.tiro.src);

      gsap.fromTo(
        $divTiroGif,
        { scaleX: 1, scaleY: 1 },
        {
          duration: 2,
          scaleX: 101,
          scaleY: 150,
          translateY: "200px",
          ease: "elastic",
          onComplete: () => {
            // acá esperamos la reproducción del video y o bien seguimos con más animaciones, o bien ocultamos el div nuevamente
            setTimeout(() => {
              $divTiro.classList.add("hide");
              $divTiroWord.classList.add("hide");
              $divTiroGif.style.transform = null;
              $divTiroWord.style.transform = null;
              v.attr("src", null);
            }, 2000);
          },
        }
      );
      setTimeout(() => {
        gsap.fromTo(
          $divTiroWordH1,
          { scale: 0.1 },
          {
            duration: 1,
            scale: 1.5,
            ease: "expo",
            onStart: () => {
              $divTiroWord.classList.remove("hide");
            },
          }
        );
      }, 2000);
    },

    // return formatted HTML version of JSON object
    syntaxHighlight: function (json) {
      json = JSON.stringify(json, undefined, 4);
      json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      json = json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          var cls = "number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }
          return '<span class="' + cls + '">' + match + "</span>";
        }
      );
      return json;
    }, // --- End of syntaxHighlight --- //

    elegirGanador: function () {
      var vueApp = this;
      let max = 0;
      vueApp.items.map((elem) => {
        if (elem.final > max) {
          max = elem.final;
          vueApp.ganador = elem.player;
        }
      });
    },

    // esta funcion manejará el estado de la partida, esto se hace comparando la señal que se manda (que será true o false) con el estado actual de la variable
    // - si estadoActual == null y se envía un estado true, entonces comienza el juego, se muestra el tablero y se está a la espera de las variables
    // - si estadoActual == true y se envía un estado false, entonces significa que se ha terminado el juego, en este caso se mostrará el resultado final del juego
    // y luego de unos segundos volverá a estar en false
    abrirJuego: function (estado) {
      var vueApp = this;
      let $divPublicidad = document.querySelector("#publicidad");
      let $divStatusPinos = document.querySelector("#statusPinos");
      $divStatusPinos.classList.add("hide");
      vueApp.divPinosOculto = true;
      if (vueApp.values.open === null && estado == true) {
        $divPublicidad.classList.add("hide");
      }
      if (vueApp.values.open == true && estado == false) {
        // después de un tiempo prudencial ocultamos el cartel de finalizado y volvemos a mostrar la publicidad, además tenemos que dejar todos los values como estaban en un ppio
        setTimeout(() => {
          document.querySelector("#finish").classList.add("hide");
          document.querySelector("#finish img").classList.add("hide");
          document.querySelector("#finishWord").classList.add("hide");
          $divPublicidad.classList.remove("hide");
          vueApp.values = {
            open: null,
            players: 0,
            jugadorlanza: "",
            accion: "",
            jugador1nombre: "",
            jugador1puntostiro: "",
            jugador1puntostotales: "",
            jugador2nombre: "",
            jugador2puntostiro: "",
            jugador2puntostotales: "",
            jugador3nombre: "",
            jugador3puntostiro: "",
            jugador3puntostotales: "",
            jugador4nombre: "",
            jugador4puntostiro: "",
            jugador4puntostotales: "",
            jugador5nombre: "",
            jugador5puntostiro: "",
            jugador5puntostotales: "",
            jugador6nombre: "",
            jugador6puntostiro: "",
            jugador6puntostotales: "",
          };
        }, 10000);
      }
      vueApp.values.open = estado;
    },

    pinos: function () {
      var vueApp = this;
      let $divStatusPinos = document.querySelector("#statusPinos");
      if ($divStatusPinos.classList.contains("hide")) {
        $divStatusPinos.classList.remove("hide");
        vueApp.divPinosOculto = false;
      } else {
        $divStatusPinos.classList.add("hide");
        vueApp.divPinosOculto = true;
      }
    },

    dispararAnimacion: function (accion) {
      var vueApp = this;
      let acciones = vueApp.acciones;
      switch (accion) {
        case acciones.strike:
          vueApp.animacionStrike();
          break;
        case acciones.spare:
          vueApp.animacionSpare();
          break;
        case acciones.espera:
          vueApp.animacionEspera();
          break;
        case acciones.tiro:
          vueApp.animacionTiro();
          break;
        case acciones.bolafuera:
          vueApp.animacionBolaFuera();
          break;
        case acciones.finalizado:
          vueApp.elegirGanador();
          vueApp.animacionFinish();
          break;
      }
    },

    precargarGifs: function () {
      var vueApp = this;
      let elemento = document.createElement("div");
      elemento.setAttribute("id", "imagenesPrecargadas");
      for (let elem in vueApp.gifs) {
        let img = document.createElement("img");
        img.src = vueApp.gifs[elem].src;
        elemento.append(img);
      }
      elemento.style = "display:none";
      document.getElementById("app").append(elemento);
      setTimeout(() => {
        elemento.remove();
      }, 2000);
    },

    // los topic son de la forma pistaX/clave entonces debemos quitar la parte de pistaX ya que es todas las pistas tendrá el mismo comportamiento
    accionClave: function (topic) {
      let arr = topic.split("/");
      arr.shift();
      return arr.join("");
    },

    // lo que se pretende hacer aquí es filtrar los valores recibidos desde node-red
    // para esto se mapean los topics y se les asigna un key que será manejado de forma local,
    // en items
    filterValues: function (json) {
      var vueApp = this;
      // obtenemos la accion clave que nos permitirá saber que se quiere hacer
      const claveAccion = vueApp.accionClave(json.topic);
      console.log("claveAccion", claveAccion);
      vueApp.values[claveAccion] = json.payload;
      const palabraClaveOpen = "open";
      const palabraClavePlayers = "players";
      const palabraClaveLanza = "jugadorlanza";
      const palabraClaveNombre = "nombre";
      const palabraClaveJugador = "jugador";
      const palabraClavePuntos = "puntos";
      const palabraClaveAccion = "accion";
      let tiros = [
        "primero",
        "segundo",
        "tercero",
        "cuarto",
        "quinto",
        "sexto",
        "septimo",
        "octavo",
        "noveno",
        "decimo",
      ];

      if (claveAccion.indexOf(palabraClaveAccion) != -1) {
        vueApp.dispararAnimacion(vueApp.values[claveAccion]);
      }
      if (claveAccion.indexOf(palabraClaveOpen) != -1) {
        // json.payload en estos casos será true o false
        vueApp.abrirJuego(json.payload);
      }

      // si el topic tiene la clave de la variable palabraClavePlayers entonces generamos el array Items con
      // json.payload cantidad de objetos base que serán nuestros items, representacion de cada uno de los jugadores
      if (claveAccion.indexOf(palabraClavePlayers) != -1) {
        if (vueApp.items.length != parseInt(json.payload)) {
          vueApp.items = [];
        }
        for (let i = 0; i < parseInt(json.payload); i++) {
          vueApp.items.push({
            player: "",
            actual: "primero",
            primero: { first: 0, second: 0, score: 0 },
            segundo: { first: 0, second: 0, score: 0 },
            tercero: { first: 0, second: 0, score: 0 },
            cuarto: { first: 0, second: 0, score: 0 },
            quinto: { first: 0, second: 0, score: 0 },
            sexto: { first: 0, second: 0, score: 0 },
            septimo: { first: 0, second: 0, score: 0 },
            octavo: { first: 0, second: 0, score: 0 },
            noveno: { first: 0, second: 0, score: 0 },
            decimo: { first: 0, second: 0, third: 0 },
            final: 0,
          });
        }
      }
      // si el topic tiene la clave jugador entonces genero un item en caso de que no exista, y obtengo el número de jugador
      // console.log(claveAccion.indexOf(palabraClaveJugador) != -1);
      // if(claveAccion.indexOf(palabraClaveJugador) != -1 && claveAccion.indexOf(palabraClaveLanza) == -1){
      //     var nroJugador = parseInt(claveAccion.charAt(7))
      //     var indexJugador = nroJugador - 1
      //     // si el item no existe lo creamos y se renderizará
      //     if(vueApp.items[indexJugador] === undefined){
      //         // let obj = {}
      //         // obj = Object.assign({}, vueApp.itemBase)
      //         // vueApp.items.push({
      //         vueApp.items[indexJugador] = {
      //             'player': '',
      //             'actual': 'primero',
      //             'primero':{first:0, second:0, score:0},
      //             'segundo':{first:0 ,second:0, score:0},
      //             'tercero':{first:0 ,second:0, score:0},
      //             'cuarto':{first:0 ,second:0, score:0},
      //             'quinto':{first:0 ,second:0, score:0},
      //             'sexto':{first:0 ,second:0, score:0},
      //             'septimo':{first:0 ,second:0, score:0},
      //             'octavo':{first:0 ,second:0, score:0},
      //             'noveno':{first:0 ,second:0, score:0},
      //             'decimo':{first:0, second:0, third:0},
      //             'final':0
      //         }
      //         // })
      //     }
      // }
      if (claveAccion.indexOf(palabraClaveLanza) != -1) {
        vueApp.values[claveAccion] = parseInt(json.payload) - 1;
      }

      // si el topic tiene la clave nombre entonces significa que tengo que guardar el nombre del jugador correspondiente, para eso ya tengo los indices en variable porque cuando tengo la clave nombre tambien tengo la clave jugador en la accion
      if (claveAccion.indexOf(palabraClaveNombre) != -1) {
        // todos los topics que tienen info del tablero vienen con jugador primero, lo que me interesa obtener
        // es la cifra que viene despues de jugador, la palabra jugador tiene 7 letras, por lo tanto interesa la posicion 7 (porque arranca desde 0, en realidad es el octavo caracter)
        const nroJugador = parseInt(claveAccion.charAt(7));
        const indexJugador = nroJugador - 1;
        console.log(vueApp.items);
        vueApp.items[indexJugador].player =
          vueApp.values["jugador" + nroJugador + "nombre"];

        console.log(
          "nombre jugador:-> ",
          vueApp.values["jugador" + nroJugador + "nombre"]
        );
      }
      // si el topic tiene la clave puntos entonces tambien tiene jugador por lo cual dispondremos de los indices de jugador, acá vamos completando los puntos del tablero
      if (claveAccion.indexOf(palabraClavePuntos) != -1) {
        let keyPuntosTiro = "jugador" + nroJugador + "puntostiro"; //es la clave en el JSON values que queremos obtener para guardar en items, que es el array que se recorre para el tablero
        let keyPuntosTotales = "jugador" + nroJugador + "puntostotales";
        let nroTiro = vueApp.items[indexJugador].actual;
        // nroTiro es el turno que se esta jugando, son 10 turnos y dos tiros en cada turno a excepción del decimo que se tiran 3 veces
        console.log("indexJugador", indexJugador);
        console.log("nroJugador", nroJugador);
        console.log("nroTiro", nroTiro);
        console.log(
          "vueApp.items[" + indexJugador + "][" + nroTiro + "].first"
        );
        console.log("itemjugador", vueApp.items[indexJugador][nroTiro]);
        if (vueApp.items[indexJugador][nroTiro].first == 0) {
          vueApp.items[indexJugador][nroTiro].first =
            vueApp.values[keyPuntosTiro];
          vueApp.items[indexJugador][nroTiro].score =
            vueApp.values[keyPuntosTotales];
        } else if (vueApp.items[indexJugador][nroTiro].second == 0) {
          vueApp.items[indexJugador][nroTiro].second =
            vueApp.values[keyPuntosTiro];
          vueApp.items[indexJugador][nroTiro].score =
            vueApp.values[keyPuntosTotales];
          // si el número de tiro no es el décimo, entonces cambiamos el turno de tiro del jugador aquí.
          if (nroTiro != "decimo") {
            let indexTiro = tiros.indexOf(nroTiro) + 1;
            vueApp.items[indexJugador].actual = tiros[indexTiro];
          }
        } else if (
          vueApp.items[indexJugador][nroTiro].hasOwnProperty("third") &&
          vueApp.items[indexJugador][nroTiro].third == 0
        ) {
          //si es el decimo tiro y el turno 3 entonces tengo que completar este valor
          vueApp.items[indexJugador][nroTiro].third =
            vueApp.values[keyPuntosTiro];
          vueApp.items[indexJugador][nroTiro].score =
            vueApp.values[keyPuntosTotales];
          vueApp.items[indexJugador].actual = "";
        }
      }
      console.log("items: ", vueApp.items);
      console.log("Values despues: ", vueApp.values);
    },
  }, // --- End of methods --- //

  // Available hooks: init,mounted,updated,destroyed
  mounted: function () {
    //console.debug('[indexjs:Vue.mounted] app mounted - setting up uibuilder watchers')

    /** **REQUIRED** Start uibuilder comms with Node-RED @since v2.0.0-dev3
     * Pass the namespace and ioPath variables if hosting page is not in the instance root folder
     * e.g. If you get continual `uibuilderfe:ioSetup: SOCKET CONNECT ERROR` error messages.
     * e.g. uibuilder.start('/nr/uib', '/nr/uibuilder/vendor/socket.io') // change to use your paths/names
     */
    uibuilder.start();

    var vueApp = this;

    // Example of retrieving data from uibuilder
    vueApp.feVersion = uibuilder.get("version");
    vueApp.precargarGifs();

    /** You can use the following to help trace how messages flow back and forth.
     * You can then amend this processing to suite your requirements.
     */

    //#region ---- Trace Received Messages ---- //
    // If msg changes - msg is updated when a standard msg is received from Node-RED over Socket.IO
    // newVal relates to the attribute being listened to.
    uibuilder.onChange("msg", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', newVal)
      vueApp.msgRecvd = newVal;
      console.log(newVal);
      //realizo una prueba para mapear datos por topic
      vueApp.filterValues(newVal);
    });
    // As we receive new messages, we get an updated count as well
    uibuilder.onChange("msgsReceived", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange] Updated count of received msgs:', newVal)
      console.log(newVal);
      vueApp.msgsReceived = newVal;
    });

    // If we receive a control message from Node-RED, we can get the new data here - we pass it to a Vue variable
    uibuilder.onChange("ctrlMsg", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:ctrlMsg] CONTROL msg received from Node-RED server:', newVal)
      vueApp.msgCtrl = newVal;
    });
    // Updated count of control messages received
    uibuilder.onChange("msgsCtrl", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:msgsCtrl] Updated count of received CONTROL msgs:', newVal)
      vueApp.msgsControl = newVal;
    });
    //#endregion ---- End of Trace Received Messages ---- //

    //#region ---- Trace Sent Messages ---- //
    // You probably only need these to help you understand the order of processing //
    // If a message is sent back to Node-RED, we can grab a copy here if we want to
    uibuilder.onChange("sentMsg", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:sentMsg] msg sent to Node-RED server:', newVal)
      vueApp.msgSent = newVal;
    });
    // Updated count of sent messages
    uibuilder.onChange("msgsSent", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:msgsSent] Updated count of msgs sent:', newVal)
      vueApp.msgsSent = newVal;
    });

    // If we send a control message to Node-RED, we can get a copy of it here
    uibuilder.onChange("sentCtrlMsg", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:sentCtrlMsg] Control message sent to Node-RED server:', newVal)
      vueApp.msgCtrlSent = newVal;
    });
    // And we can get an updated count
    uibuilder.onChange("msgsSentCtrl", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:msgsSentCtrl] Updated count of CONTROL msgs sent:', newVal)
      vueApp.msgsCtrlSent = newVal;
    });
    //#endregion ---- End of Trace Sent Messages ---- //

    // If Socket.IO connects/disconnects, we get true/false here
    uibuilder.onChange("ioConnected", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:ioConnected] Socket.IO Connection Status Changed to:', newVal)
      vueApp.socketConnectedState = newVal;
    });
    // If Server Time Offset changes
    uibuilder.onChange("serverTimeOffset", function (newVal) {
      //console.info('[indexjs:uibuilder.onChange:serverTimeOffset] Offset of time between the browser and the server has changed to:', newVal)
      vueApp.serverTimeOffset = newVal;
    });
  }, // --- End of mounted hook --- //
});

// --- End of app1 --- //

// EOF
