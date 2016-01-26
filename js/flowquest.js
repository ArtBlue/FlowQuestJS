/**
 *  Flowquest JS
 *  @description Flowquest is a flowchart questionaire utility that allows you to create any questionaire you want by feeding in your own data. The only requirement is that the data object needs to conform to the specific pattern expected.
 *  @copyright  Copyright (c) 2015 Arthur Khachatryan
 *  @author     Arthur Khachatryan  <arthur@aspiremedia.net>
 *  @since      0.01
 *  @version    0.02
 *  @license    http://opensource.org/licenses/MIT  MIT License
 *  @beta
 */
var flowquest = function(fq) {
    /**
     * local reference to top level questions object
     * @type {object}
     */
    var oQuestions = fq.questions
        /**
         * keep track of current question
         * @type {number}
         */
        , currentQueston = 1
        /**
         * answers object
         * @type {object}
         */
        , oAnswers = fq.answers
        /**
         * selector for container element
         * @type {string}
         */
        , sContainer = fq.containerID
        /**
         * should push state be used to track pages/page states in order to provide navigatability
         * @type {boolean}
         */
        , bUsePushState = fq.usePushState
        /**
         * placeholder for the container element
         * @type {DOMElement}
         */
        , elContainer
        /**
         * Object to keep track of all references 
         * @type {Object}
         */
        , oReferences = {
            QTag                : 'div'
            , QTagPrefix        : 'fq-question-'
            , QTagBaseClass     : 'fq-question'
            , QTagActiveClass   : 'fq-active'
            , QTagInactiveClass : 'fq-inactive'
            , OptTag            : 'a'
            , OptPrefix         : 'option-'
            , OptClass          : 'fq-option'
            , OptLblData        : 'data-answer'
            , OptValData        : 'data-val'
            , ATag              : 'div'
            , ATagId            : 'answer-result'
        }
        /**
         * start flowquest processing
         * @param  {object}     data    the flowquest data object
         * @return {void}               nothing 
         */
        , _start = function (data) {
            console.log('starting...');
            _buildQuestion(currentQueston);

            if (bUsePushState) {
                window.addEventListener('popstate', function(e) {
                    var 
                        oQuestion = e.state
                    ;
                    // e.state is equal to the data-attribute of the last image we clicked
                    console.log(oQuestion);
                    _buildQuestion(oQuestion.qid);
                });
            }
        }
        /**
         * Add new page to browser's history to make navigation possible
         * @description Keep in mind that running this locally is likely to cause issues. A history state object cannot be created in a document with origin 'null'.
         * @param       {number} quid   the question id number
         * @param       {object} data   the question object
         * @property    {string} title  the title of the new page adding to history
         * @property    {string} url    the url of the new page adding to history
         * @return {void}
         */
        , _newPageQuestion = function(qid, data) {
            var 
                title = data.question
                , url = title.replace(' ', '-')
                , oQuestion = {
                    qid: qid,
                    data: data
                }
            ;

            history.pushState(oQuestion, title, url);
        }
        /**
         * build a question
         * @param  {number}     qid     the question number to build
         * @return {void}               nothing 
         */ 
        , _buildQuestion = function (qid) {
            // questions
            var thisQ = oQuestions[qid]
                , questionTag = oReferences.QTag
                , questionTagID = oReferences.QTagPrefix + qid
                , questionClasses = oReferences.QTagBaseClass + ' ' + oReferences.QTagActiveClass
                , questionTxt = qid + '. ' + thisQ.question
                
                // answer options
                , newOptTag = oReferences.OptTag
                , newOptElPrefix = oReferences.OptPrefix
                , newOptElClasses = oReferences.OptClass
                , newOptData = oReferences.OptLblData
                , newValData = oReferences.OptValData
                , i = 0
                , oOptions = thisQ['options']
                , sCustomOptionClasses
            ;
            
            var questionEl = _appendChild({
                elParent: elContainer,
                newTag:   questionTag,
                newElID:  questionTagID,
                sHTML:    questionTxt,
                elClasses: questionClasses
            });

            for(var optName in oOptions) {
                // if there are custom classes used in options...
                sOptionClasses = oOptions[optName].classes || '';

                // add options
                _appendChild({
                    elParent: questionEl,
                    newTag: newOptTag,
                    newElID: questionTagID + '-' + newOptElPrefix + optName,
                    elClasses: newOptElClasses + ' ' + sOptionClasses,
                    attribs: [
                        { aName: newOptData, aVal: oOptions[optName].val },
                        { aName: newValData, aVal: optName }
                    ],
                    sHTML: oOptions[optName].label
                }).addEventListener('click', _recordAnswer, false);
            }

            // if push state setting is turned on, add question as a page to browser's history
            if (bUsePushState) {
                _newPageQuestion(qid,thisQ);
            }
        }
        , _init = function() {
            elContainer = _getEl(sContainer);
            _start();
        }()
    ;
    
    /**
     * Answer selection callback
     * @this        {DOMElement}    The DOM element of the answer
     * @property    {string}        answerVal   the string of the answer
     * @property    {string}        dataVal     the answer data value
     * @return      {DOMElement}    The DOM element of the answer
     */
    function _recordAnswer() {
        var answerVal = _getAttr(this, oReferences.OptLblData) // @todo centralize this to remove duplication
            , dataVal = _getAttr(this, oReferences.OptValData)
        ;

        // add answer to current question
        fq.questions[currentQueston].answer = answerVal;

        _nextQuestion(this, dataVal);
        return this;
    }

    /**
     * Move to the next question
     * @param   {DOMElement}    thisQ           the DOM element of the current question
     * @param   {string}        thisAnswerData  the answer data string 
     * @return  {void}          nothing
     */
    function _nextQuestion(thisQ, thisAnswerData) {
        // hide the whole question, not just the current answer selection
        _hideEl(thisQ.parentNode);

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
     * End all questions, record the results into DOM
     * @return {void} nothin
     */
    function _endAllQuestions() {
        var sAnswersPattern = ''
            , sResultContent
            , sResultPosition
            , sClasses
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

        // if there are custom classes used in answer...
        sClasses = oAnswers.patterns[sAnswersPattern].classes || '';

        // add answer to DOM
        var questionEl = _appendChild({
            elParent:  elContainer,
            newTag:    oReferences.ATag,
            newElID:   oReferences.ATagId,
            elClasses: sClasses,
            sHTML:     sResultPosition + ': ' + sResultContent
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

    /**
     * Hide element
     * @param  {DOMElement}     el  the DOM element
     * @return {DOMElement}         the DOM element to be hidden
     */
    function _hideEl(el) {
        if (el.classList.contains(oReferences.QTagActiveClass)) {
            el.classList.remove(oReferences.QTagActiveClass);
            el.classList.add(oReferences.QTagInactiveClass);
        }
        return el;
    }
    
    /**
     * Get element
     * @param   {string}        sel     the selector string
     * @return  {DOMElement}            the DOM selected element
     */
    function _getEl(sel) {
        if (!sel || !document.querySelectorAll(sel)) {
            return console.log('no selector');
        }
        return document.getElementById(sel);
    }

    /**
     * Append DOM element with its own features to parent element
     * @param       {object}        args                the arguments object
     * @property    {DOMElement}    args.elParent       the parent DOM element   
     * @property    {string}        args.newTag         the new HTML tag to be created  
     * @property    {string}        args.newElID        the new ID to be applied to the element being created  
     * @property    {array}         args.newElClasses   the list of classes to be added to the element being created 
     * @property    {array}         args.attribs        the list of attribute object for name and value to be added to the element being created
     * @property    {string}        args.sText          the text to be added to the DOM node 
     * @return      {DOMElement}                        the newly created DOM element 
     */
    function _appendChild (args) {
        var elParent       = args.elParent
            , newTag       = args.newTag
            , newElID      = args.newElID
            , newEl        = document.createElement(newTag)
            , newElClasses = args.elClasses
            , newElAttr    = args.attribs || null
            , i = 0
        ;

        newEl.id = newElID;

        if (args.sHTML) {
            newEl.innerHTML = args.sHTML;
        } else if (args.sText) {
            var newContent = document.createTextNode(args.sText);
            //add the text node to the newly created div.
            newEl.appendChild(newContent);
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