/**
 * Flowquest JS
 */
var flowquest = function(fq) {

	var oQuestions = fq.questions
		, currentQueston = 1
		, oAnswers = fq.answers
		//, nAnswersLengh = aAnswers.length
		, sContainer = fq.containerID
		, elContainer
		, _start = function (data) {
			_buildQuestion(currentQueston);
		}
		, _buildQuestion = function (qid) {
			// questions
			var thisQ = oQuestions[qid]
				, questionTag = 'div'
				, questionTagID = 'fq-question-' + qid
				, questionClasses = 'fq-question'
				, questionTxt = qid + '. ' + thisQ.question
				
				// answer options
				, newOptTag = 'a'
				, newOptElPrefix = 'option-'
				, newOptElClasses = 'fq-option'
				, newOptData = 'data-answer'
				, newValData = 'data-val'
				, i = 0
				, oOptions = thisQ['options']
			;
			
			var questionEl = _appendChild({
				elParent: elContainer,
				newTag:   questionTag,
				newElID:  questionTagID,
				sText:    questionTxt,
				elClasses: questionClasses
			});

			var aKeys = Object.keys(oOptions);

			for(var optName in oOptions) {

				// add options
				_appendChild({
					elParent: questionEl,
					newTag: newOptTag,
					newElID: questionTagID + '-' + newOptElPrefix + optName,
					elClasses: newOptElClasses,
					attribs: [
						{ aName: newOptData, aVal: oOptions[optName].val },
						{ aName: newValData, aVal: optName }
					],
					sText: oOptions[optName].label
				}).addEventListener('click', _recordAnswer, false);
			}
		}
		, _init = function() {
			elContainer = _getEl(sContainer);
			_start();
		}()
	;

	// private functions
	
	/**
	 * Answer selection callback
	 * @this 	{DOMElement}   	The DOM element of the answer
	 * @return 	{DOMElement}  	The DOM element of the answer
	 */
	function _recordAnswer() {
		var answerVal = _getAttr(this,'data-answer') // @todo centralize this to remove duplication
			, dataVal = _getAttr(this,'data-val')
		;

		// add answer to current question
		fq.questions[currentQueston].answer = answerVal;

		_nextQuestion(this, dataVal);
		return this;
	}

	/**
	 * Move to the next question
	 * @this {DOMElement} The DOM element of the current question
	 * @return {DOMElement} The dom element of the next question
	 */
	function _nextQuestion(thisQ, thisAnswerData) {
		thisQ.parentNode.style.display = 'none';

		var thisAnswerString = thisQ.innerHTML;

		console.log(fq.questions[currentQueston]['options'][thisAnswerData]);

		if (!fq.questions[currentQueston]['options'][thisAnswerData].nextQ) {
			return _endAllQuestions();
		}
		
		var nextQuestion = fq.questions[currentQueston]['options'][thisAnswerData].nextQ
			, bMoreQuestions = fq.questions[nextQuestion] ? true : false
		;

		// if more questions are available, build the next question 
		if (bMoreQuestions) {
			_buildQuestion(nextQuestion);
			currentQueston = nextQuestion;
		// if no more questions are available, finish flowquest
		} else {
			_endAllQuestions();
		}
	}

	/**
	 * End all questions
	 * @return {void} nothin
	 */
	function _endAllQuestions() {
		var sAnswersPattern = ''
			, sResultContent
			, sResultPosition
		;

		for (question in fq.questions) {
			if (fq.questions[question].answer) {
				sAnswersPattern += fq.questions[question].answer + '|';
			}
		}

		console.log(sAnswersPattern,oAnswers.patterns[sAnswersPattern]);

		if (oAnswers.patterns[sAnswersPattern] && oAnswers.patterns[sAnswersPattern].content) {
			sResultContent = oAnswers.patterns[sAnswersPattern].content;
			sResultPosition = oAnswers.patterns[sAnswersPattern].position 
							  ? oAnswers.patterns[sAnswersPattern].position 
							  : 'unknown';
		} else {
			sResultContent = 'You are too unique - we have no data that matches your answers.';
			sResultPosition = 'unknown';
		}

		console.log('Flowquest finished! Results:');
		console.log(sAnswersPattern);
		console.log(sResultPosition,sResultContent);

		// add answer to DOM
		var questionEl = _appendChild({
			elParent: elContainer,
			newTag:   'div',
			newElID:  'answer-result',
			sText:    sResultPosition + ': ' + sResultContent
		});
	}

	// DOM stuff
	
	/**
	 * Get attribute value
	 */
	function _getAttr(el, attr) {
		if (!el || !attr) {
			return console.log('No element or attribute specified!');
		}
		return el.getAttribute(attr);
	}

	function _hideElement() {
		console.log(this);
		this.style.display = 'none';
		return this;
	}
	
	
	/**
	 * Get element
	 * @param  	{string} 		sel 	the selector string
	 * @return 	{DOMElement}     		the DOM selected element
	 */
	function _getEl(sel) {
		if (!sel || !document.querySelectorAll(sel)) {
			return console.log('no selector');
		}
		return document.getElementById(sel);
	}

	function _appendChild (args) {
		var elParent       = args.elParent
			, newTag       = args.newTag
			, newElID      = args.newElID
			, newEl        = document.createElement(newTag)
			//, newElAttr    = args.attr ? { attrName: args.attr.aName, attrVal: args.attr.aVal } : []
			, newElClasses = args.elClasses
			, newElAttr    = args.attribs || null
			, i = 0
		;

		newEl.id = newElID;

		if (args.sText) {
			var newContent = document.createTextNode(args.sText);
			newEl.appendChild(newContent); //add the text node to the newly created div.
		}
		if (newElClasses) {
			newEl.className = newElClasses;
		}

		// if attribute(s), iterate and add all
		if (newElAttr) {
			var newAttr
				, newElAttrLen = newElAttr.length
			;

			for (; i < newElAttrLen; i++) {
				newAttr = document.createAttribute(newElAttr[i].aName);
				newAttr.value = newElAttr[i].aVal;
				newEl.setAttributeNode(newAttr); // set attribute
			}
		}

		elParent.appendChild(newEl);
		
		return newEl;
	}

};