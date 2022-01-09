"use strict";


/* Encapsulation of the code */

let encap = (function() {


    /* Declaring global variables only in this scope */

    let processedId;
    let authId;
    let dataBlock;
    let selectMenu = 0;
    let nameData;
    let birthDateData;
    let addressData;
    let emailData;
    let telData;
    let initialDateData;
    let statusCode;
    let urlData;
    let newDataId = 0;
    let delStat = true;
    let mailctrl = true;
    let flashingColor;
    let flashingColorRun = false;


    /* Login data block */

    $("#loginSending").hide();

    function loginBlockSend() {
        $("#loginSend").hide();
        $("#loginSending").show();
        processedId = Math.round(Math.random() * 10000000000000000000);
        authId = Math.round(Math.random() * 10000000000000000000);
        urlData = "http://localhost:3016/processing/";
        $.ajax({
                method: "POST",
                url: urlData,
                cache: "false",
                data: {
                    id: processedId,
                    authorizationId: authId,
                    creationTime: "",
                    processed: "false",
                    operationalCode: "10",
                    reactionCode: "",
                    loginName: $("#loginNameInput").val(),
                    password: $("#loginPasswordInput").val(),
                    nextCardsId: "",
                    cardsId: "",
                    name: "",
                    birthDate: "",
                    address: "",
                    email: "",
                    tel: "",
                    initialDate: ""
                },
                error: function() {
                    serverError();
                }
            })
            .done(function() {
                loginBlockListen();
            });
    }

    function loginBlockListen() {
        urlData = "http://localhost:3016/processing/" + processedId;
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
                dataBlock = dataRequest["responseJSON"];
            })
            .done(function() {
                if (dataBlock.processed === "true" && dataBlock.reactionCode === "110") {
                    $(".loginPage").hide();
                    $("#loginSending").hide();
                    $("#loginSend").show();
                    successfullyLogin();
                    $(".main").show();
                } else {
                    if (dataBlock.reactionCode === "120") {
                        loginErrorMessage();
                    } else {
                        setTimeout(loginBlockListen, 1000);
                    }
                }
            });
    }


    /* Menu select - appearance */

    $(".data1").slideUp(0);

    $(document).ready(function() {
        $(".menu11, .menu12, .menu13, .menu14").hover(function() {
            $(this).css("background-color", "#ffdb99");
            $(this).css("font-size", "12pt");
        }, function() {
            $(this).css("background-color", "#ffc14d");
            $(this).css("font-size", "10pt");
        });
        $(".menu11").click(function() {
            selectMenu = 1;
            $(".data1").slideUp(0);
            $(".data1").slideDown(0);
            $("#cardNumberInput").show();
            $("#name, #birthDate, #address, #email, #tel, #initialDate").show().css("background-color", "#FFDEAD");
            $("#cardNumber, #nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").hide();
            $(".data18").hide();
            $(".data10, .data11, .data12, .data13, .data14, .data15, .data16, .data17").show().css("background-color", "#FFA500");
            let d10 = $(".111").text();
            $(".data10").text(d10);
            $(".data10").css("font-size", "20pt");
            $("#cardNumber").css("background-color", "#ffffff");
            delStat = true;
        });
        $(".menu12").click(function() {
            selectMenu = 2;
            $(".data1").slideUp(0);
            $(".data1").slideDown(0);
            $(".data10, .data11, .data12, .data13, .data14, .data15, .data16, .data17, .data18").show().css("background-color", "#32CD32");
            $("#cardNumber, #nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").show();
            $("#cardNumberInput, #name, #birthDate, #address, #email, #tel, #initialDate").hide();
            let d10 = $(".112").text();
            $(".data10").text(d10);
            $(".data10").css("font-size", "20pt");
            $("#name, #birthDate, #address, #email, #tel").css("background-color", "#ffffff");
            $("#cardNumber, #initialDate").css("background-color", "#FFDEAD");
            $("#cardNumber").text($("#cardNumberInput").val());
            $("#nameInput").val(nameData);
            $("#birthDateInput").val(birthDateData);
            $("#addressInput").val(addressData);
            $("#emailInput").val(emailData);
            $("#telInput").val(telData);
            $("#initialDateInput").val(initialDateData);
            $(".data18").tooltip({
                position: { my: "bottom", at: "top-20" },
                show: { effect: "bounce", duration: 300, easing: "easeOutQuad", delay: 0 },
            });
            let outWidth = $(".main").outerWidth();
            if (outWidth > 600) {
                $(".data18").tooltip("enable");
            } else {
                $(".data18").tooltip("disable");
            }
            clearTimeout(flashingColor);
            $("#emailInput").css("background-color", "#ffffff");
            delStat = true;
        });
        $(".menu13").click(function() {
            selectMenu = 3;
            $(".data1").slideUp(0);
            $(".data1").slideDown(0);
            $(".data10, .data11, .data12, .data13, .data14, .data15, .data16, .data17, .data18").show().css("background-color", "#87CEFA");
            $("#cardNumberInput, #name, #birthDate, #address, #email, #tel, #initialDate").hide();
            $("#cardNumber, #nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").show();
            let d10 = $(".113").text();
            $(".data10").text(d10);
            $(".data10").css("font-size", "20pt");
            $("#name, #birthDate, #address, #email, #tel, #initialDate").css("background-color", "white");
            $("#cardNumber").css("background-color", "#FFDEAD");
            $("#nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").val("");
            $(".data18").tooltip({
                position: { my: "bottom", at: "top-20" },
                show: { effect: "bounce", duration: 300, easing: "easeOutQuad", delay: 0 },
            });
            let outWidth = $(".main").outerWidth();
            if (outWidth > 600) {
                $(".data18").tooltip("enable");
            } else {
                $(".data18").tooltip("disable");
            }
            clearTimeout(flashingColor);
            $("#emailInput").css("background-color", "#ffffff");
            delStat = true;
        });
        $(".menu14").click(function() {
            selectMenu = 4;
            $(".data1").slideUp(0);
            $(".data1").slideDown(0);
            $(".data10, .data11, .data12, .data13, .data18").show().css("background-color", "#ff4d4d");
            $("#name, #birthDate").show().css("background-color", "#ffb3b3");
            $("#cardNumberInput").show().css("background-color", "#ffffff");
            $(".data14, .data15, .data16, .data17").hide();
            $(".data18").show();
            $("#cardNumber, #nameInput, #birthDateInput").hide();
            let d10 = $(".114").text();
            $(".data10").text(d10);
            $(".data10").css("font-size", "20pt");
            $(".data18").tooltip({
                disabled: "true"
            });
        });
    });

    $("#dataSending").hide();


    /* Defining messages and alerts */

    function successfullyLogin() {
        $("#mainMessage").dialog({
            width: 350,
            height: 280,
            draggable: false,
            resizable: false
        });
    }

    function loginErrorMessage() {
        $("#loginErrorMessage").dialog({
            width: 350,
            height: 150,
            draggable: false,
            resizable: false
        });
    }

    function serverError() {
        $(".main").hide();
        $("#serverErrorMessage").dialog({
            width: 350,
            height: 250,
            draggable: false,
            resizable: false
        });
    }

    function successfullyModifySend() {
        $("#successfulModifySendMessage").dialog({
            width: 350,
            height: 150,
            draggable: false,
            resizable: false
        });
        $(".data18").tooltip("disable");
    }

    function successfullySendNewCard() {
        $("#successfulNewCardMessage").dialog({
            width: 350,
            height: 150,
            draggable: false,
            resizable: false
        });
        $(".data18").tooltip("disable");
    }

    function successfullyDelete() {
        $("#successfulDeleteMessage").dialog({
            width: 350,
            height: 150,
            draggable: false,
            resizable: false
        });
    }

    $(".main").after("<div id='loginErrorMessage' title='FIGYELMEZTETÉS!!!'>Hibás a név és/vagy a jelszó!!<br>Sajnos Ön nem jogosult a kártyakezelő rendszer használatára!!!</div>");
    $("#loginErrorMessage").hide();

    $(".main").after("<div id='mainMessage' title='BEJELENTKEZÉS!'>Ön sikeresen bejelentkezett!!!<br>Üdvözöljük Önt a Demo Kft. törzsvásárlói kártyakezelő rendszerében! Ez a verzió minta adatokat tartalmaz, a kártyaszámok intervalluma: 1001-1015!<br><br>( Kattintson az X-re az ablak bezárásához!</div>");
    $("#mainMessage").hide();

    $(".main").after("<div id='serverErrorMessage' title='FIGYELMEZTETÉS!!!'><b>KOMMUNIKÁCIÓS HIBA!!!!!<br><br>A szerver nem érhető el adatátviteli hiba miatt (vagy nem működik)!!!<br>Emiatt jelenleg nem használható a kártyakezelő rendszer!!!</b></div>");
    $("#serverErrorMessage").hide();

    $(".main").after("<div id='emptyMessage' title='FIGYELMEZTETÉS!!!'>Minden mező kitöltése kötelező!!!<br>Kérem, töltse ki a hiányzó adatokat és kattintson ismét az 'OK' gombra!!!</div>");
    $("#emptyMessage").hide();

    $(".main").after("<div id='successfulModifySendMessage' title='ADATMÓDOSÍTÁS!!!'>Az adatok küldése a szervernek rendben megtörtént, a módosított kártya adatok rögzítve vannak!!!</div>");
    $("#successfulModifySendMessage").hide();

    $(".main").after("<div id='successfulNewCardMessage' title='ÚJ KÁRTYA RÖGZÍTÉSE!!!'>Az adatok küldése a szervernek rendben megtörtént, az új kártya adatai rögzítve vannak!!!</div>");
    $("#successfulNewCardMessage").hide();

    $(".main").after("<div id='successfulDeleteMessage' title='ADATTÖRLÉS!!!'>A törlési kérelem küldése a szervernek rendben megtörtént, a kártya adatai törlésre kerültek!!!</div>");
    $("#successfulDeleteMessage").hide();

    $(".main").after("<div id='delMessage' title='FIGYELMEZTETÉS!!!'><b>A kártya adatainak a végleges törlését kezdeményezte!<br>Valóban törölni akarja a rendszerből a kiválasztott kártyát???<br>Ha biztos benne, akkor zárja be ezt az ablakot és kattintson még egyszer az 'OK' gombra!!!</b></div>");
    $("#delMessage").hide();


    /* Card data query data block */

    function question() {
        clearing();
        processedId = Math.round(Math.random() * 10000000000000000000);
        let cardNumber = parseInt($("#cardNumberInput").val());
        urlData = "http://localhost:3016/processing/";
        $.ajax({
                method: "POST",
                url: urlData,
                cache: "false",
                data: {
                    id: processedId,
                    authorizationId: authId,
                    creationTime: "",
                    processed: "false",
                    operationalCode: "11",
                    reactionCode: "",
                    loginName: "",
                    password: "",
                    nextCardsId: "",
                    cardsId: cardNumber,
                    name: "",
                    birthDate: "",
                    address: "",
                    email: "",
                    tel: "",
                    initialDate: ""
                },
                error: function() {
                    serverError();
                }
            })
            .done(function() {
                questionListen();
            });
    }

    function questionListen() {
        urlData = "http://localhost:3016/processing/" + processedId;
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
                dataBlock = dataRequest["responseJSON"];
            })
            .done(function() {
                if (dataBlock.processed === "true" && dataBlock.reactionCode === "110") {
                    displayWrite();
                } else if (dataBlock.processed === "true" && dataBlock.reactionCode === "120") {
                    statusCode = 404;
                    errorHandling();
                } else {
                    setTimeout(questionListen, 1000);
                }
            });
    }


    function displayWrite() {
        $("#name").text(dataBlock.name);
        $("#birthDate").text(dataBlock.birthDate);
        $("#address").text(dataBlock.address);
        $("#email").text(dataBlock.email);
        $("#tel").text(dataBlock.tel);
        $("#initialDate").text(dataBlock.initialDate);
        nameData = $("#name").text();
        birthDateData = $("#birthDate").text();
        addressData = $("#address").text();
        emailData = $("#email").text();
        telData = $("#tel").text();
        initialDateData = $("#initialDate").text();
    }

    function errorHandling() {
        if (statusCode === 404) {
            $("#name").text("Érvénytelen kártyaszám!!!");
            $("#birthDate").text("---");
            $("#address").text("---");
            $("#email").text("---");
            $("#tel").text("---");
            $("#initialDate").text("---");
            nameData = $("#name").text();
            birthDateData = $("#birthDate").text();
            addressData = $("#address").text();
            emailData = $("#email").text();
            telData = $("#tel").text();
            initialDateData = $("#initialDate").text();
        } else if (statusCode === 0) {
            serverError();
        } else {
            alert("System error!!!");
        }
    }

    function clearing() {
        $("#name, #birthDate, #address, #email, #tel, #initialDate").text("");
    }


    /* Card data modification data block */

    function dataModify() {
        $("#dataSend").hide();
        $("#dataSending").show();
        processedId = Math.round(Math.random() * 10000000000000000000);
        let cardNumber = parseInt($("#cardNumberInput").val());
        urlData = "http://localhost:3016/processing/";
        $.ajax({
                method: "POST",
                url: urlData,
                cache: "false",
                data: {
                    id: processedId,
                    authorizationId: authId,
                    creationTime: "",
                    processed: "false",
                    operationalCode: "12",
                    reactionCode: "",
                    loginName: "",
                    password: "",
                    nextCardsId: "",
                    cardsId: cardNumber,
                    name: $("#nameInput").val(),
                    birthDate: $("#birthDateInput").val(),
                    address: $("#addressInput").val(),
                    email: $("#emailInput").val(),
                    tel: $("#telInput").val(),
                    initialDate: $("#initialDateInput").val()
                },
                error: function() {
                    serverError();
                }
            })
            .done(function() {
                dataModifyListen();
            });
    }

    function dataModifyListen() {
        urlData = "http://localhost:3016/processing/" + processedId;
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
                dataBlock = dataRequest["responseJSON"];
            })
            .done(function() {
                if (dataBlock.processed === "true" && dataBlock.reactionCode === "110") {
                    $("#dataSending").hide();
                    $("#dataSend").show();
                    successfullyModifySend();
                    question();
                    clearingNextData();
                } else if (dataBlock.processed === "true" && dataBlock.reactionCode === "120") {
                    statusCode = 404;
                    errorHandling();
                } else {
                    setTimeout(dataModifyListen, 1000);
                }
            });
    }


    /* Sending next card number data block */

    $(".menu13").click(function() {
        $("#cardNumber").text("Új kártyaszám generálása folyamatban!");
        idCall();
    });

    function idCall() {
        if (newDataId > 0) {
            $("#cardNumber").text(newDataId);
        } else {
            idCalling();
        }
    }

    function idCalling() {
        processedId = Math.round(Math.random() * 10000000000000000000);
        urlData = "http://localhost:3016/processing/";
        $.ajax({
                method: "POST",
                url: urlData,
                cache: "false",
                data: {
                    id: processedId,
                    authorizationId: authId,
                    creationTime: "",
                    processed: "false",
                    operationalCode: "15",
                    reactionCode: "",
                    loginName: "",
                    password: "",
                    nextCardsId: "",
                    cardsId: "",
                    name: "",
                    birthDate: "",
                    address: "",
                    email: "",
                    tel: "",
                    initialDate: ""
                },
                error: function() {
                    serverError();
                }
            })
            .done(function() {
                idCallingListen();
            });
    }

    function idCallingListen() {
        urlData = "http://localhost:3016/processing/" + processedId;
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
                dataBlock = dataRequest["responseJSON"];
                if (dataBlock.processed === "true" && dataBlock.reactionCode === "110") {
                    newDataId = dataBlock.nextCardsId;
                    $("#cardNumber").text(newDataId);
                } else if (dataBlock.processed === "true" && dataBlock.reactionCode === "120") {
                    statusCode = 404;
                    errorHandling();
                } else {
                    setTimeout(idCallingListen, 1000);
                }
            });
    }


    /* New card data block */

    function newDataSend() {
        $("#dataSend").hide();
        $("#dataSending").show();
        processedId = Math.round(Math.random() * 10000000000000000000);
        urlData = "http://localhost:3016/processing/";
        $.ajax({
                method: "POST",
                url: urlData,
                cache: "false",
                data: {
                    id: processedId,
                    authorizationId: authId,
                    creationTime: "",
                    processed: "false",
                    operationalCode: "13",
                    reactionCode: "",
                    loginName: "",
                    password: "",
                    nextCardsId: "",
                    cardsId: newDataId,
                    name: $("#nameInput").val(),
                    birthDate: $("#birthDateInput").val(),
                    address: $("#addressInput").val(),
                    email: $("#emailInput").val(),
                    tel: $("#telInput").val(),
                    initialDate: $("#initialDateInput").val()
                },
                error: function() {
                    serverError();
                }
            })
            .done(function() {
                newDataSendListen();
            });
    }

    function newDataSendListen() {
        urlData = "http://localhost:3016/processing/" + processedId;
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
                dataBlock = dataRequest["responseJSON"];
            })
            .done(function() {
                if (dataBlock.processed === "true" && dataBlock.reactionCode === "110") {
                    clearingNextData();
                    idCalling();
                    $("#dataSending").hide();
                    $("#dataSend").show();
                    successfullySendNewCard();
                } else if (dataBlock.processed === "true" && dataBlock.reactionCode === "120") {
                    statusCode = 404;
                    errorHandling();
                } else {
                    setTimeout(newDataSendListen, 1000);
                }
            });
    }


    function clearingNextData() {
        $("#nameInput, #birthDateInput, #addressInput, #emailInput, #telInput, #initialDateInput").val("");
    }


    /* Card data deletion block */

    function deleteData() {
        $("#dataSend").hide();
        $("#dataSending").show();
        processedId = Math.round(Math.random() * 10000000000000000000);
        let cardNumber = parseInt($("#cardNumberInput").val());
        urlData = "http://localhost:3016/processing/";
        $.ajax({
                method: "POST",
                url: urlData,
                cache: "false",
                data: {
                    id: processedId,
                    authorizationId: authId,
                    creationTime: "",
                    processed: "false",
                    operationalCode: "14",
                    reactionCode: "",
                    loginName: "",
                    password: "",
                    nextCardsId: "",
                    cardsId: cardNumber,
                    name: "",
                    birthDate: "",
                    address: "",
                    email: "",
                    tel: "",
                    initialDate: ""
                },
                error: function() {
                    serverError();
                }
            })
            .done(function() {
                deleteDataListen();
            });
    }

    function deleteDataListen() {
        urlData = "http://localhost:3016/processing/" + processedId;
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
                dataBlock = dataRequest["responseJSON"];
            })
            .done(function() {
                if (dataBlock.processed === "true" && dataBlock.reactionCode === "110") {
                    $("#dataSending").hide();
                    $("#dataSend").show();
                    successfullyDelete();
                    question();
                } else if (dataBlock.processed === "true" && dataBlock.reactionCode === "120") {
                    statusCode = 404;
                    errorHandling();
                } else {
                    setTimeout(deleteDataListen, 1000);
                }
            });
    }


    /* Check the valid format of the email address */

    function mailControl() {
        flashingColor = setTimeout(function() {
            if (mailctrl === true) {
                $("#emailInput").css("background-color", "#ffb3b3");
                mailctrl = false;
            } else {
                $("#emailInput").css("background-color", "#ffffff");
                mailctrl = true;
            }
            mailControl();
        }, 200);
    }

    function mailvalid() {
        clearTimeout(flashingColor);
        let m = $("#emailInput").val();
        let m1 = m.includes("@");
        let m2 = m.includes(".");
        if (m1 === false || m2 === false) {
            mailControl();
            flashingColorRun = true;
        } else {
            clearTimeout(flashingColor);
            $("#emailInput").css("background-color", "#ffffff");
            flashingColorRun = false;
        }
    }


    /* Function selector */

    function menuSwitch() {
        switch (selectMenu) {
            case 1:
                break;
            case 2:
                dataModify();
                break;
            case 3:
                newDataSend();
                break;
            case 4:
                if (delStat === true) {
                    $("#delMessage").dialog({
                        width: 350,
                        height: 250,
                        draggable: false,
                        resizable: false
                    });
                    delStat = false;
                } else {
                    deleteData();
                    delStat = true;
                }
                break;
        }
    }


    /* Data send button verification function */

    $("#dataSend").click(function() {
        let nameInputBlank = $("#nameInput").val();
        let nameBlank = nameInputBlank.length;
        let birthDateInputBlank = $("#birthDateInput").val();
        let birthDateBlank = birthDateInputBlank.length;
        let addressInputBlank = $("#addressInput").val();
        let addressBlank = addressInputBlank.length;
        let emailInputBlank = $("#emailInput").val();
        let emailBlank;
        if (flashingColorRun === true) {
            emailBlank = 0;
        } else {
            emailBlank = emailInputBlank.length;
        }
        let telInputBlank = $("#telInput").val();
        let telBlank = telInputBlank.length;
        let initialDateInputBlank = $("#initialDateInput").val();
        let initialDateBlank = initialDateInputBlank.length;

        if (selectMenu === 2 || selectMenu === 3) {
            if (nameBlank === 0 || birthDateBlank === 0 || addressBlank === 0 || emailBlank === 0 || telBlank === 0 || initialDateBlank === 0) {
                $("#emptyMessage").dialog({
                    width: 350,
                    height: 150,
                    draggable: false,
                    resizable: false
                });
                $(".data18").tooltip({
                    disabled: true
                });
            } else {
                menuSwitch();
            }
        } else {
            menuSwitch();
        }
    });


    /* Date window format */

    let date = new Date();
    let year = date.getFullYear();
    $("#birthDateInput, #initialDateInput").datepicker({
        dateFormat: "yy-mm-dd",
        monthNamesShort: ["Jan", "Feb", "Márc", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szept", "Okt", "Nov", "Dec"],
        dayNamesMin: ["Vas", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"],
        firstDay: 1,
        showMonthAfterYear: true,
        changeMonth: true,
        changeYear: true,
        yearRange: "1920:year",
        showWeek: true,
        weekHeader: "#",
        showButtonPanel: false
    });


    /* Closure (IIFE --->>> return) */

    return {
        getLoginBlockSend: () => {
            return loginBlockSend();
        },
        getQuestion: () => {
            return question();
        },
        getMailValid: () => {
            return mailvalid();
        },
    };

})();