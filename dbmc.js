"use strict";


/* Encapsulation of the code */

(() => {


    /* Declaring global variables only in this scope */

    let dataBlock;
    let dataFromServer;
    let certiData;
    let urlData;
    let xid;
    let authDB = [];
    let authCode = 0;
    let errorMessage = false;
    let illegalCourse = false;
    let serviceLicense = false;
    let statusCode;
    let blockCreationTime;
    let currentTime;
    let newDataId;
    let tempId;

    /* Input block */
    let inputId = "empty";
    let inputAuthorizationId;
    let inputCreationTime;
    let inputProcessed;
    let inputOperationalCode;
    let inputReactionCode;
    let inputLoginName;
    let inputPassword;
    let inputNextCardsId;
    let inputCardsId;
    let inputName;
    let inputBirthDate;
    let inputAddress;
    let inputEmail;
    let inputTel;
    let inputInitialDate;

    /* Output block */
    let outputId = "";
    let outputCreationTime;
    let outputProcessed = "";
    let outputOperationalCode = "";
    let outputReactionCode = "";
    let outputLoginName = "";
    let outputPassword = "";
    let outputNextCardsId = "";
    let outputCardsId = "";
    let outputName = "";
    let outputBirthDate = "";
    let outputAddress = "";
    let outputEmail = "";
    let outputTel = "";
    let outputInitialDate = "";


    /* Monitoring the data blocks to be processed */

    function dataBlockListen() {
        clearing();
        urlData = "http://localhost:3016/processing/";
        let dataRequest = $.ajax({
                method: "GET",
                url: urlData,
                cache: "false",
                dataType: "JSON",
                error: function() {
                    errorMessage = true;
                    serverError();
                }
            })
            .done(function() {
                dataBlock = dataRequest["responseJSON"];
            })
            .done(function() {
                blockDataBuffering();
            });
    }


    function blockDataBuffering() {
        blockCreationTime = Number(new Date());
        for (let key in dataBlock) {
            if (dataBlock[key].processed === "false") {
                inputId = (dataBlock[key].id);
                xid = (dataBlock[key].authorizationId);
                inputAuthorizationId = (dataBlock[key].authorizationId);
                inputCreationTime = blockCreationTime;
                dataBlock[key].creationTime = blockCreationTime;
                inputProcessed = (dataBlock[key].processed);
                inputOperationalCode = (dataBlock[key].operationalCode);
                inputLoginName = (dataBlock[key].loginName);
                inputPassword = (dataBlock[key].password);
                inputNextCardsId = (dataBlock[key].nextCardsId);
                inputCardsId = (dataBlock[key].cardsId);
                inputName = (dataBlock[key].name);
                inputBirthDate = (dataBlock[key].birthDate);
                inputAddress = (dataBlock[key].address);
                inputEmail = (dataBlock[key].email);
                inputTel = (dataBlock[key].tel);
                inputInitialDate = (dataBlock[key].initialDate);
            }
        }
        if (inputId === "empty" || (parseInt(inputOperationalCode) < 10 || parseInt(inputOperationalCode) > 15)) {
            obsoleteBlockDelete();
        } else {
            dataProcessing();
        }
    }


    /* Monitoring and deleting obsolete blocks */

    function obsoleteBlockDelete() {
        tempId = 0;
        currentTime = Number(new Date());
        for (let key in dataBlock) {
            if ((currentTime - parseInt(dataBlock[key].creationTime)) > 60000) {
                tempId = (dataBlock[key].id);
            }
        }
        obsoleteBlock();
    }

    function obsoleteBlock() {
        if (tempId > 0) {
            urlData = "http://localhost:3016/processing/" + tempId;
            $.ajax({
                    method: "DELETE",
                    url: urlData,
                    cache: "false",
                    error: function() {
                        errorMessage = true;
                        serverError();
                    }
                })
                .done(function() {
                    repeater();
                });
        } else {
            repeater();
        }
    }


    /* Continuous monitoring */

    function repeater() {
        setTimeout(dataBlockListen, 500);
    }


    /* Data block processing control */

    function dataProcessing() {
        switch (parseInt(inputOperationalCode)) {
            case 10:
                certifyData();
                break;
            case 11:
                license();
                question();
                break;
            case 12:
                license();
                cardDataModify();
                break;
            case 13:
                license();
                idVerification();
                break;
            case 14:
                license();
                deleteCard();
                break;
            case 15:
                license();
                cardNumberSequence(nextCardNumber);
                break;
        }
    }

    function nextCardNumber() {
        nextIdGenerate();
    }

    function cardNumberSequence(callback) {
        idCalling();
        callback();
    }


    /* Authentication */

    function certifyData() {
        authCode = 0;
        urlData = "http://localhost:3012/namePassword/";
        let dataRequest = $.ajax({
                method: "GET",
                url: urlData,
                cache: "false",
                dataType: "JSON",
                error: function() {
                    errorMessage = true;
                    serverError();
                }
            })
            .done(function() {
                certiData = dataRequest["responseJSON"];
                certifyDataVerification();
                selectAuthCode();
            });
    }

    function certifyDataVerification() {
        for (let key in certiData) {
            if (certiData[key].loginname === inputLoginName && certiData[key].password === inputPassword) {
                authDB.push(xid);
                authCode = 1;
            }
        }
    }

    function selectAuthCode() {
        if (authCode === 1) {
            outputOperationalCode = inputOperationalCode;
            outputReactionCode = "110";
            answer();
        }
        if (authCode === 0) {
            outputOperationalCode = inputOperationalCode;
            outputReactionCode = "120";
            answer();
        }
    }


    /* Service license handling */

    function license() {
        serviceLicense = false;
        for (let key in authDB) {
            if (authDB[key] === xid) {
                serviceLicense = true;
            }
        }
    }


    /* Database query */

    function question() {
        if (serviceLicense === true) {
            urlData = "http://localhost:3012/cards/" + inputCardsId;
            let dataRequest = $.ajax({
                    method: "GET",
                    url: urlData,
                    cache: "false",
                    dataType: "JSON"
                })
                .done(function() {
                    dataFromServer = dataRequest["responseJSON"],
                        writeResponseData();
                })
                .fail(function(xhr) {
                    statusCode = xhr.status,
                        errorHandling();
                });
        } else {
            illegalCourse = true;
            blockDelete();
        }
    }

    function writeResponseData() {
        outputReactionCode = "110";
        outputName = dataFromServer.name;
        outputBirthDate = dataFromServer.birthDate;
        outputAddress = dataFromServer.address;
        outputEmail = dataFromServer.email;
        outputTel = dataFromServer.tel;
        outputInitialDate = dataFromServer.initialDate;
        answer();
    }

    function errorHandling() {
        if (statusCode === 404) {
            outputReactionCode = "120";
            outputName = "";
            outputBirthDate = "";
            outputAddress = "";
            outputEmail = "";
            outputTel = "";
            outputInitialDate = "";
            answer();
        } else if (statusCode === 0) {
            outputReactionCode = "99";
            outputName = "";
            outputBirthDate = "";
            outputAddress = "";
            outputEmail = "";
            outputTel = "";
            outputInitialDate = "";
            answer();
        } else {
            alert("System error!!!");
        }
    }


    /* Card data modify */

    function cardDataModify() {
        outputReactionCode = "120";
        if (serviceLicense === true) {
            urlData = "http://localhost:3012/cards/" + inputCardsId;
            $.ajax({
                    method: "PUT",
                    url: urlData,
                    cache: "false",
                    data: {
                        id: inputCardsId,
                        name: inputName,
                        birthDate: inputBirthDate,
                        address: inputAddress,
                        email: inputEmail,
                        tel: inputTel,
                        initialDate: inputInitialDate
                    },
                    error: function() {
                        serverError();
                    }
                })
                .done(function() {
                    outputReactionCode = "110";
                    outputName = inputName;
                    outputBirthDate = inputBirthDate;
                    outputAddress = inputAddress;
                    outputEmail = inputEmail;
                    outputTel = inputTel;
                    outputInitialDate = inputInitialDate;
                    answer();
                });
        } else {
            illegalCourse = true;
            blockDelete();
        }
    }


    /* Get next card number */

    function idCalling() {
        outputReactionCode = "120";
        if (serviceLicense === true) {
            urlData = "http://localhost:3012/serialNumber/1/";
            let dataRequest = $.ajax({
                    method: "GET",
                    url: urlData,
                    cache: "false",
                    dataType: "JSON",
                    error: function() {
                        serverError();
                    }
                })
                .done(function() {
                    outputNextCardsId = dataRequest["responseJSON"]["recent"];
                    outputReactionCode = "110";
                    outputCardsId = "";
                    outputName = "";
                    outputBirthDate = "";
                    outputAddress = "";
                    outputEmail = "";
                    outputTel = "";
                    outputInitialDate = "";
                    answer();
                });
        } else {
            illegalCourse = true;
            blockDelete();
        }
    }


    /* Generate a new card number */

    function nextIdGenerate() {
        let tempID;
        urlData = "http://localhost:3012/serialNumber/1/";
        let dataRequest = $.ajax({
                method: "GET",
                url: urlData,
                cache: "false",
                dataType: "JSON",
                error: function() {
                    serverError();
                }
            })
            .done(function() {
                tempID = dataRequest["responseJSON"]["recent"];
                let nextId = parseInt(tempID);
                newDataId = nextId + 1;
                urlData = "http://localhost:3012/serialNumber/1/";
                $.ajax({
                    method: "PUT",
                    url: urlData,
                    cache: "false",
                    data: {
                        recent: newDataId
                    },
                    error: function() {
                        serverError();
                    }
                });
            });
    }


    /* Send new data */

    function idVerification() {
        urlData = "http://localhost:3012/cards/" + inputCardsId;
        $.ajax({
                method: "GET",
                url: urlData,
                cache: "false",
                dataType: "JSON"
            })
            .done(function() {
                blockDelete();
            })
            .fail(function(xhr) {
                statusCode = xhr.status;
                if (statusCode === 404) {
                    sendNewData();
                } else {
                    alert("System error!!!");
                }
            });
    }

    function sendNewData() {
        outputReactionCode = "120";
        if (serviceLicense === true) {
            urlData = "http://localhost:3012/cards/";
            $.ajax({
                    method: "POST",
                    url: urlData,
                    cache: "false",
                    data: {
                        id: inputCardsId,
                        name: inputName,
                        birthDate: inputBirthDate,
                        address: inputAddress,
                        email: inputEmail,
                        tel: inputTel,
                        initialDate: inputInitialDate
                    },
                    error: function() {
                        serverError();
                    }
                })
                .done(function() {
                    outputReactionCode = "110";
                    outputNextCardsId = "";
                    outputName = inputName;
                    outputBirthDate = inputBirthDate;
                    outputAddress = inputAddress;
                    outputEmail = inputEmail;
                    outputTel = inputTel;
                    outputInitialDate = inputInitialDate;
                    idCalling();
                });
        } else {
            illegalCourse = true;
            blockDelete();
        }
    }


    /* Delete data */

    function deleteCard() {
        outputReactionCode = "120";
        if (serviceLicense === true) {
            urlData = "http://localhost:3012/cards/" + inputCardsId;
            $.ajax({
                    method: "PUT",
                    url: urlData,
                    cache: "false",
                    data: {
                        id: inputCardsId,
                        name: "TÖRÖLT KÁRTYA!!!",
                        birthDate: "---",
                        address: "---",
                        email: "---",
                        tel: "---",
                        initialDate: "---"
                    },
                    error: function() {
                        serverError();
                    }
                })
                .done(function() {
                    outputReactionCode = "110";
                    answer();
                });
        } else {
            illegalCourse = true;
            blockDelete();
        }
    }


    /* Return a processed data block */

    function answer() {
        urlData = "http://localhost:3016/processing/" + inputId;
        $.ajax({
                method: "PUT",
                url: urlData,
                cache: "false",
                data: {
                    id: outputId,
                    authorizationId: inputAuthorizationId,
                    creationTime: inputCreationTime,
                    processed: "true",
                    operationalCode: inputOperationalCode,
                    reactionCode: outputReactionCode,
                    loginName: "",
                    password: "",
                    nextCardsId: outputNextCardsId,
                    cardsId: outputCardsId,
                    name: outputName,
                    birthDate: outputBirthDate,
                    address: outputAddress,
                    email: outputEmail,
                    tel: outputTel,
                    initialDate: outputInitialDate
                },
                error: function() {
                    errorMessage = true;
                    serverError();
                }
            })
            .done(function() {
                repeater();
            });
    }


    /* New clean data block */

    function clearing() {
        inputId = "empty";
        inputAuthorizationId = "";
        inputCreationTime = "";
        inputProcessed = "";
        inputOperationalCode = "";
        inputReactionCode = "";
        inputLoginName = "";
        inputPassword = "";
        inputNextCardsId = "";
        inputCardsId = "";
        inputName = "";
        inputBirthDate = "";
        inputAddress = "";
        inputEmail = "";
        inputTel = "";
        inputInitialDate = "";
    }


    /* Delete illegal block */

    function blockDelete() {
        urlData = "http://localhost:3016/processing/" + inputId;
        $.ajax({
                method: "DELETE",
                url: urlData,
                cache: "false",
                error: function() {
                    errorMessage = true;
                    serverError();
                }
            })
            .done(function() {
                repeater();
            });
    }


    /* Defining DBMC message */

    $(".main").after("<div id='serverErrorMessage' title='FIGYELMEZTETÉS!!!'><b>KOMMUNIKÁCIÓS HIBA!!!!!<br><br>Az adatbázis-szerver nem érhető el adatátviteli hiba miatt (vagy nem működik)!!!</b></div>");
    $("#serverErrorMessage").hide();

    function serverError() {
        $(".main").hide();
        $("#serverErrorMessage").dialog({
            width: 350,
            height: 250,
            draggable: false,
            resizable: false
        });
    }


    /* Start monitoring by the DBMC */

    dataBlockListen();

})();