/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _stopwatch = __webpack_require__(/*! ./stopwatch */ \"./src/js/stopwatch.js\");\n\nvar _stopwatch2 = _interopRequireDefault(_stopwatch);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar workClock = document.getElementById('work-clock');\nvar start = document.getElementById('start');\nvar rest = document.getElementById('rest');\nvar end = document.getElementById('end');\nvar workList = document.querySelector(\".record__column-heading--work\");\nvar restList = document.querySelector(\".record__column-heading--rest\");\nvar totalList = document.querySelector(\".record__column-heading--total\");\nvar dateList = document.querySelector(\".record__column-heading--date\");\nvar restAddTime = document.getElementById('btn-rest-add-time');\nvar workAddTime = document.getElementById('btn-work-add-time');\nvar restSubtractTime = document.getElementById('btn-rest-subtract-time');\nvar workSubtractTime = document.getElementById('btn-work-subtract-time');\n\nvar workStopwatch = new _stopwatch2.default(workClock);\nvar breakStopwatch = new _stopwatch2.default(rest);\n\nvar data = [];\n\nvar formattedDate = void 0;\n\n//BUTTONS TO ADJUST TIME UP/DOWN\nrestAddTime.addEventListener('click', function () {\n    breakStopwatch.addTime();\n});\nworkAddTime.addEventListener('click', function () {\n    workStopwatch.addTime();\n});\nrestSubtractTime.addEventListener('click', function () {\n    breakStopwatch.subtractTime();\n});\nworkSubtractTime.addEventListener('click', function () {\n    workStopwatch.subtractTime();\n});\n\n// WORK/BREAK BUTTON\nstart.addEventListener('click', function () {\n    if (workStopwatch.isOn) {\n        workStopwatch.stop();\n        breakStopwatch.start();\n        start.textContent = \"Work\";\n        animateworkClockOn();\n        animatebreakStopwatchOff();\n    } else {\n        workStopwatch.start();\n        breakStopwatch.stop();\n        start.textContent = \"Break\";\n        animateworkClockOff();\n        animatebreakStopwatchOn();\n    }\n});\n\n//END WORKDAY BUTTON\nend.addEventListener('click', function () {\n    workStopwatch.stop();\n    breakStopwatch.stop();\n    pushToDateRecord();\n    pushToWorkRecord();\n    pushToBreakRecord();\n    pushToTotalRecord();\n    workStopwatch.reset();\n    breakStopwatch.reset();\n    start.textContent = \"Work\";\n});\n\nvar postDataItem = function postDataItem(item, list, className) {\n    var li = document.createElement('li');\n    li.className = 'record__column-item';\n    li.appendChild(document.createTextNode(item));\n    list.appendChild(li);\n    li.classList.add(className);\n};\n\nvar loadData = function loadData() {\n    console.log(\"this 2?\");\n\n    //RE-POPULATE DATA FROM LOCAL STORAGE\n    Object.keys(localStorage).forEach(function (item) {\n        data.push(JSON.parse(localStorage.getItem(item)));\n    });\n\n    // RE-POST DATA FROM RECORDS\n    data.forEach(function (item) {\n        postDataItem(item[0], dateList);\n        postDataItem(item[1], workList, 'green');\n        postDataItem(item[2], restList, 'red');\n        postDataItem(item[3], totalList);\n    });\n};\n\nloadData();\n\nvar pushToDateRecord = function pushToDateRecord() {\n\n    //Add to record list\n    var date = new Date();\n    var month = date.getMonth() + 1;\n    var day = date.getDate();\n    formattedDate = month + '/' + day;\n\n    postDataItem(formattedDate, dateList);\n\n    //Push to data\n    data.push([]);\n    data[data.length - 1].push(formattedDate);\n};\n\nvar pushToWorkRecord = function pushToWorkRecord() {\n    var time = workStopwatch.returnTime();\n    var formattedworkStopwatch = recordFormatter(time);\n\n    postDataItem(formattedworkStopwatch, workList, 'green');\n\n    //push to data\n    data[data.length - 1].push(formattedworkStopwatch);\n};\n\nvar pushToBreakRecord = function pushToBreakRecord() {\n    var restTime = breakStopwatch.returnTime();\n    var formattedRestTime = recordFormatter(restTime);\n\n    postDataItem(formattedRestTime, restList, 'red');\n\n    //push to data\n    data[data.length - 1].push(formattedRestTime);\n};\n\nvar pushToTotalRecord = function pushToTotalRecord() {\n\n    var totalTime = workStopwatch.returnTime() + breakStopwatch.returnTime();\n    var formattedTotalTime = recordFormatter(totalTime);\n\n    postDataItem(formattedTotalTime, totalList);\n\n    //push data to data\n    data[data.length - 1].push(formattedTotalTime);\n\n    //push to local storage\n    var storageKey = (data.length - 1).toString();\n    var storageArr = JSON.stringify(data[storageKey]);\n    localStorage.setItem(storageKey, storageArr);\n};\n\nvar recordFormatter = function recordFormatter(time) {\n    var minutes = parseInt(time / (1000 * 60) % 60),\n        hours = parseInt(time / (1000 * 60 * 60) % 24);\n    minutes = minutes < 10 ? \"0\" + minutes : minutes;\n    return hours + \":\" + minutes;\n};\n\n// ANIMATIONS\nvar animateworkClockOn = function animateworkClockOn() {\n    workClock.classList.remove('turnGreen');\n    workClock.classList.add('turnGrey');\n    workClock.style.color = \"rgb(60, 102, 52)\";\n    workClock.style.transform = \"scale(.85)\";\n};\n\nvar animateworkClockOff = function animateworkClockOff() {\n    workClock.classList.add('turnGreen');\n    workClock.classList.remove('turnGrey');\n    workClock.style.color = \"rgb(13, 104, 21)\";\n    workClock.style.transform = \"scale(1)\";\n};\n\nvar animatebreakStopwatchOn = function animatebreakStopwatchOn() {\n    rest.style.color = \"rgba(120, 120, 120)\";\n    rest.style.transform = \"scale(.85)\";\n};\n\nvar animatebreakStopwatchOff = function animatebreakStopwatchOff() {\n    rest.style.color = \"rgba(0, 0, 0)\";\n    rest.style.transform = \"scale(1)\";\n};\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./src/js/stopwatch.js":
/*!*****************************!*\
  !*** ./src/js/stopwatch.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = Stopwatch;\nfunction Stopwatch(elem) {\n    var _this = this;\n\n    var time = 0;\n    var interval = void 0;\n    var offset = void 0;\n\n    var update = function update() {\n        if (_this.isOn) {\n            time += delta();\n        }\n        elem.textContent = timeFormatter(time);\n        return _this.time;\n    };\n    var delta = function delta() {\n        //delta just means change\n        var newTime = Date.now();\n        //This gives us a time in milliseconds. We'll calculate the timePassed and pass that into a Date object to gain access to getMinutes() getSeconds() etc. This will make formatting easier. \n        var timePassed = newTime - offset;\n        offset = newTime;\n        return timePassed;\n    };\n\n    var timeFormatter = function timeFormatter(time) {\n        var milliseconds = Math.floor(time % 1000 / 10),\n            seconds = Math.floor(time / 1000 % 60),\n            minutes = Math.floor(time / (1000 * 60) % 60),\n            hours = Math.floor(time / (1000 * 60 * 60) % 24);\n        //The modulo makes sure to cut off the hours at 24, minutes at 60, etc. Ex: 12%24 returns 12, whereas 36%24 returns 12 (because it's been 1 day and 12 hours).\n        //Math.floor is important because any number less than 1 means that it hasn't reached the trigger point to add another digit to that denomination. \n\n        hours = hours < 10 ? \"0\" + hours : hours;\n        minutes = minutes < 10 ? \"0\" + minutes : minutes;\n        seconds = seconds < 10 ? \"0\" + seconds : seconds;\n        milliseconds = milliseconds < 10 ? \"0\" + milliseconds : milliseconds;\n\n        return hours + \" : \" + minutes + \" : \" + seconds + \" : \" + milliseconds;\n    };\n\n    this.addTime = function () {\n        time += 300000;\n        update();\n    };\n    this.subtractTime = function () {\n        if (time >= 300000) {\n            time -= 300000;\n            update();\n        } else if (time < 300000 && time > 0) {\n            time = 0;\n            update();\n        }\n    };\n\n    this.isOn = false;\n\n    this.returnTime = function () {\n        return time;\n    };\n\n    this.start = function () {\n        if (!_this.isOn) {\n            interval = setInterval(update, 10);\n            offset = Date.now();\n            _this.isOn = true;\n        }\n    };\n\n    this.stop = function () {\n        if (_this.isOn) {\n            clearInterval(interval); //stops the setInterval function \n            _this.isOn = false;\n        }\n    };\n\n    this.reset = function () {\n        time = 0;\n        update();\n    };\n}\n\n//# sourceURL=webpack:///./src/js/stopwatch.js?");

/***/ })

/******/ });