// ----------module----------
const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

// ----------port----------
const port = 3001;

// ----------ejs----------
app.set("view engine", "ejs");

// ----------post----------
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------userdata----------
const readFile = fs.readFileSync("userData.json", "utf-8");
const jsonData = JSON.parse(readFile);
let userArr = [];
userArr = [...jsonData];

// ----------knowledge104----------
let knowledge104 = [];
const knowledgeFile = fs.readFileSync("knowledgeData.json", "utf-8");
const jsonKnowData = JSON.parse(knowledgeFile);
knowledge104 = [...jsonKnowData];

// ----------stage----------
let stage = [];
const stageFile = fs.readFileSync("stageData.json", "utf-8");
const jsonStageData = JSON.parse(stageFile);
stage = [...jsonStageData];

// ----------achieveDB----------
let achievedbArr = [];
const achievedbFile = fs.readFileSync("achieveDBv2.json", "utf-8");
const achievedbData = JSON.parse(achievedbFile);
achievedbArr = [...achievedbData];

// ----------achieveDBv2----------
let test = [];
const testJson = fs.readFileSync("achieveDBv2.json", "utf-8");
const testData = JSON.parse(testJson);
test = [...testData];

// ----------calendar memo----------
const memoreadFile = fs.readFileSync("./public/json/memo.json", "utf-8");
const memojsonData = JSON.parse(memoreadFile);
let memoArr = [];
memoArr = [...memojsonData];

// ----------chatting----------
let chattingdbArr = [];
const chattingdbFile = fs.readFileSync("chattingDB.json", "utf-8");
const chattingdbData = JSON.parse(chattingdbFile);
chattingdbArr = [...chattingdbData];

// ----------multer----------
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // 저장 위치
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // 원래 이미지명으로 저장
  },
});
const upload = multer({
  storage: storage,
});

// ----------다크모드----------
let modeArr = [];
const modereadfile = fs.readFileSync("black.json", "utf-8");
const modeArrData = JSON.parse(modereadfile);
modeArr = [...modeArrData];

// ----------영문----------
let langArr = [];
const langreadfile = fs.readFileSync("lang.json", "utf-8");
const langArrData = JSON.parse(langreadfile);
langArr = [...langArrData];

// ----------en----------
let stageEn = [];
const stageEnFile = fs.readFileSync("stageDataEn.json", "utf-8");
const jsonStageDataEn = JSON.parse(stageEnFile);
stageEn = [...jsonStageDataEn];

let knowledgeEn104 = [];
const knowledgeEnFile = fs.readFileSync("knowledgeDataEn.json", "utf-8");
const jsonKnowEnData = JSON.parse(knowledgeEnFile);
knowledgeEn104 = [...jsonKnowEnData];

let achievedbEnArr = [];
const achievedbEnFile = fs.readFileSync("achieveDBv2En.json", "utf-8");
const achievedbDataEn = JSON.parse(achievedbEnFile);
achievedbEnArr = [...achievedbDataEn];

// ----------splash----------
app.get("/", function (req, res) {
  res.render("pages/index.ejs", { userArr });
});

// ----------UserName----------
app.get("/UserName", (req, res) => {
  res.render("pages/UserName.ejs", { modeArr });
});
// ----------InpuUserNameData----------
app.post("/UserNameData", (req, res) => {
  userArr[0].userName = req.body.userName;
  userArr[0].id = 0;

  // id 중복 제거
  const filterArr = userArr.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  userArr = filterArr;

  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/NoMoreInfo");
});

// ----------StartDate----------
app.get("/StartDate", (req, res) => {
  res.render("pages/StartDate.ejs");
});
// ----------StartDate 입력----------
app.post("/StartDateData", (req, res) => {
  // 월,일 입력값이 0보다 작으면 0 추가
  if (req.body.StartMonth < 10) {
    req.body.StartMonth = "" + req.body.StartMonth;
  }
  if (req.body.StartDay < 10) {
    req.body.StartDay = "" + req.body.StartDay;
  }
  if (req.body.StartHour < 10) {
    req.body.StartHour = "" + req.body.StartHour;
  }
  if (req.body.StartMinute < 10) {
    req.body.StartMinute = "" + req.body.StartMinute;
  }
  // 배열에 데이터 추가
  userArr[0].StartYear = req.body.StartYear;
  userArr[0].StartMonth = req.body.StartMonth;
  userArr[0].StartDay = req.body.StartDay;
  userArr[0].StartHour = req.body.StartHour;
  userArr[0].StartMinute = req.body.StartMinute;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/EndDate");
});

// ----------EndDate----------
app.get("/EndDate", (req, res) => {
  res.render("pages/EndDate.ejs");
});
// ----------EndDate 입력----------
app.post("/EndDateData", (req, res) => {
  // 월,일 입력값이 0보다 작으면 0 추가
  if (req.body.EndMonth < 10) {
    req.body.EndMonth = "" + req.body.EndMonth;
  }
  if (req.body.EndDay < 10) {
    req.body.EndDay = "" + req.body.EndDay;
  }
  if (req.body.EndHour < 10) {
    req.body.EndHour = "" + req.body.EndHour;
  }
  if (req.body.EndMinute < 10) {
    req.body.EndMinute = "" + req.body.EndMinute;
  }
  // 배열에 데이터 추가
  userArr[0].EndYear = req.body.EndYear;
  userArr[0].EndMonth = req.body.EndMonth;
  userArr[0].EndDay = req.body.EndDay;
  userArr[0].EndHour = req.body.EndHour;
  userArr[0].EndMinute = req.body.EndMinute;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/CountPerDay");
});

// ----------CountPerDay----------
app.get("/CountPerDay", (req, res) => {
  res.render("pages/CountPerDay.ejs");
});
// ----------CountPerDay 입력----------
app.post("/CountPerDayData", (req, res) => {
  // 배열에 데이터 추가
  userArr[0].CountPerDay = req.body.CountPerDay;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/Price");
});

// ----------Price----------
app.get("/Price", (req, res) => {
  res.render("pages/Price.ejs");
});
// ----------Price 입력----------
app.post("/PriceData", (req, res) => {
  // 배열에 데이터 추가
  userArr[0].Price = req.body.Price;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/BrithDay");
});

// ----------BrithDay----------
app.get("/BrithDay", (req, res) => {
  res.render("pages/BrithDay.ejs");
});
// ----------BrithDay 입력----------
app.post("/BrithDayData", (req, res) => {
  // 월,일 입력값이 0보다 작으면 0 추가
  if (req.body.BrithDayMonth < 10) {
    req.body.BrithDayMonth = "" + req.body.BrithDayMonth;
  }
  if (req.body.BrithDayDay < 10) {
    req.body.BrithDayDay = "" + req.body.BrithDayDay;
  }
  // 배열에 데이터 추가
  userArr[0].BrithDayYear = req.body.BrithDayYear;
  userArr[0].BrithDayMonth = req.body.BrithDayMonth;
  userArr[0].BrithDayDay = req.body.BrithDayDay;
  // 데이터 업데이트
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/Main");
});

// ----------main----------
// 사용자 정보를 모두 입력했을 때 보여줄 페이지
app.get("/main", (req, res) => {
  // 현재시간
  const now = new Date();
  // 서버 한국 시간
  const korea = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + 9,
    now.getMinutes()
  );
  let nowY = korea.getFullYear();
  let nowM = korea.getMonth() + 1;
  let nowD = korea.getDate();
  // 월,일 0보다 작으면 0추가
  if (nowM < 10) {
    nowM = "0" + nowM;
  }
  if (nowD < 10) {
    nowD = "0" + nowD;
  }
  // 시작시간
  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  );
  // 지난시간(분)
  const pass = Math.floor((korea - start) / (1000 * 60));

  // 현재 단계 구하기
  let stageCount = stage
    .map((e) => e.min <= pass)
    .filter((e) => e == true).length;

  // 업적 데이터 불러오기
  // 업적 달성을위한 가격
  const testPrice = test[0].Price;
  // 업적 달성을위한 날짜
  const testDay = test[1].Day;
  // 업적 달성을위한 담배 개수
  const testCount = test[2].Count;

  // 금연 진행 날짜
  const day = parseInt((korea - start) / (60 * 60 * 24 * 1000));

  // 각 조건condition에 맞는 데이터 불러오기
  let testPriceArr = testPrice.filter(
    (e) => e.condition <= day * userArr[0].Price
  );
  let testDayArr = testDay.filter((e) => e.condition <= day);
  let testCountArr = testCount.filter(
    (e) => e.condition <= day * userArr[0].CountPerDay
  );

  // 조건 달성하면 달성 날짜 추가하기
  if (testPriceArr.length > 0) {
    if (testPriceArr.at(-1).date == undefined) {
      testPriceArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
    }
  }
  if (testDayArr.length > 0) {
    if (testDayArr.at(-1).date == undefined) {
      testDayArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
    }
  }
  if (testCountArr.length > 0) {
    if (testCountArr.at(-1).date == undefined) {
      testCountArr.at(-1).date = `${nowY}-${nowM}-${nowD}`;
    }
  }

  // 업적 총 개수 구하기
  let allLength = testPrice.length + testDay.length + testCount.length;
  // 업적 달성 개수 구하기
  let totalLength =
    testPriceArr.length + testDayArr.length + testCountArr.length;

  res.render("pages/main.ejs", {
    userArr,
    knowledge104,
    achievedbArr,
    stage,
    pass,
    stageCount,
    totalLength,
    allLength,
    testPriceArr,
    testDayArr,
    testCountArr,
    modeArr,
    langArr,
    stageEn,
    knowledgeEn104,
  });
});

// ----------NoMoreInfo----------
// 사용자 정보를 이름만 입력했을 때 보여줄 페이지
app.get("/NoMoreInfo", (req, res) => {
  res.render("pages/NoMoreInfo.ejs", { userArr, knowledge104 });
});

// ----------stage----------
app.get("/stage", function (req, res) {
  // 현재시간
  const now = new Date().getTime();

  // 시작시간
  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  ).getTime();
  // 지난시간(분)
  let pass = Math.floor((now - start) / (1000 * 60));
  pass += 9 * 60;
  // 현재 단계 구하기
  let stageCount = stage
    .map((e) => {
      return e.min <= pass;
    })
    .filter((e) => e == true).length;

  res.render("pages/stage.ejs", {
    stage,
    pass,
    stageCount,
    modeArr,
    langArr,
    stageEn,
  });
});

// --------------------knowledge--------------------
app.get("/knowledge", function (req, res) {
  res.render("pages/knowledge.ejs", {
    knowledge104,
    modeArr,
    langArr,
    knowledgeEn104,
  });
});

// ----------symptom (금단증상) 페이지----------
app.get("/symptom", function (req, res) {
  res.render("pages/symptom.ejs", { modeArr, langArr });
});

// ----------achievement (업적) 페이지----------
app.get("/achievement", function (req, res) {
  // 현재 시간 구하기
  const now = new Date();
  // 서버 한국 시간
  const korea = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + 9,
    now.getMinutes()
  );
  let nowY = korea.getFullYear();
  let nowM = korea.getMonth() + 1;
  let nowD = korea.getDate();

  // 월,일이 0보다 작으면 0추가하기
  if (nowM < 10) {
    nowM = "0" + nowM;
  }
  if (nowD < 10) {
    nowD = "0" + nowD;
  }

  // 금연 시작 시간 날짜
  const start = new Date(
    userArr[0].EndYear,
    userArr[0].EndMonth - 1,
    userArr[0].EndDay,
    userArr[0].EndHour,
    userArr[0].EndMinute
  );
  // 업적 조건 데이터 불러오기
  const testPrice = test[0].Price;
  const testDay = test[1].Day;
  const testCount = test[2].Count;
  const achievedbEnArrPirce = achievedbEnArr[0].Price;
  const achievedbEnArrDay = achievedbEnArr[1].Day;
  const achievedbEnArrCount = achievedbEnArr[2].Count;

  // 금연 진행 날짜
  const day = parseInt((korea - start) / (60 * 60 * 24 * 1000));

  let testPriceArr = testPrice.filter((e) => {
    return e.condition <= day * userArr[0].Price;
  });
  let achievedbEnArrPirceArr = achievedbEnArrPirce.filter((e) => {
    return e.condition <= day * userArr[0].Price;
  });

  let testDayArr = testDay.filter((e) => {
    return e.condition <= day;
  });
  let achievedbEnArrDayArr = achievedbEnArrDay.filter((e) => {
    return e.condition <= day;
  });

  let testCountArr = testCount.filter((e) => {
    return e.condition <= day * userArr[0].CountPerDay;
  });
  let achievedbEnArrCountArr = achievedbEnArrCount.filter((e) => {
    return e.condition <= day * userArr[0].CountPerDay;
  });

  if (testPriceArr.length > 0) {
    if (testPriceArr.at(-1).date == undefined) {
      testPriceArr.forEach((e) => {
        e.date = `${nowY}-${nowM}-${nowD}`;
      });
    }
  }
  if (achievedbEnArrPirceArr.length > 0) {
    if (achievedbEnArrPirceArr.at(-1).date == undefined) {
      achievedbEnArrPirceArr.forEach((e) => {
        e.date = `${nowY}-${nowM}-${nowD}`;
      });
    }
  }
  if (testDayArr.length > 0) {
    if (testDayArr.at(-1).date == undefined) {
      testDayArr.forEach((e) => {
        e.date = `${nowY}-${nowM}-${nowD}`;
      });
    }
  }
  if (achievedbEnArrDayArr.length > 0) {
    if (achievedbEnArrDayArr.at(-1).date == undefined) {
      achievedbEnArrDayArr.forEach((e) => {
        e.date = `${nowY}-${nowM}-${nowD}`;
      });
    }
  }
  if (testCountArr.length > 0) {
    if (testCountArr.at(-1).date == undefined) {
      testCountArr.forEach((e) => {
        e.date = `${nowY}-${nowM}-${nowD}`;
      });
    }
  }
  if (achievedbEnArrCountArr.length > 0) {
    if (achievedbEnArrCountArr.at(-1).date == undefined) {
      achievedbEnArrCountArr.forEach((e) => {
        e.date = `${nowY}-${nowM}-${nowD}`;
      });
    }
  }

  let allLength = testPrice.length + testDay.length + testCount.length;
  let totalLength =
    testPriceArr.length + testDayArr.length + testCountArr.length;

  fs.writeFileSync("achieveDBv2.json", JSON.stringify(test));
  res.render("pages/achievement.ejs", {
    test,
    totalLength,
    achievedbArr,
    userArr,
    allLength,
    modeArr,
    langArr,
    achievedbEnArr,
  });
});

// ----------userinfo----------
app.get("/userinfo", async function (req, res) {
  res.render("pages/userinfo.ejs", { userArr, modeArr, langArr });
});
app.get("/title", function (req, res) {
  res.render("pages/title.ejs");
});
// ----------setting----------
app.get("/setting", function (req, res) {
  res.render("pages/setting.ejs", { modeArr, langArr });
});
// ----------다크모드----------
app.post("/theme", function (req, res) {
  if (modeArr[0].mode == "black") {
    modeArr[0].mode = "white";
  } else {
    modeArr[0].mode = "black";
  }
  fs.writeFileSync("black.json", JSON.stringify(modeArr));
  res.redirect("/setting");
});
// ----------언어 변경----------
app.post("/lang", function (req, res) {
  if (langArr[0].lang[1].en == "yes") {
    langArr[0].lang[0].kor = "yes";
    langArr[0].lang[1].en = "";
  } else {
    langArr[0].lang[0].kor = "";
    langArr[0].lang[1].en = "yes";
  }
  fs.writeFileSync("lang.json", JSON.stringify(langArr));
  res.redirect("/setting");
});
// ----------데이터 reset----------
// ----------달력 정보 초기화----------
app.post("/memoReset", (req, res) => {
  memoArr = [];
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/");
});
// ----------사용자 정보 초기화----------
app.post("/userReset", (req, res) => {
  userArr = [{}];
  // 업적 달성 날짜 초기화
  test[0].Price.forEach((e) => {
    e.date = undefined;
  });
  test[1].Day.forEach((e) => {
    e.date = undefined;
  });
  test[2].Count.forEach((e) => {
    e.date = undefined;
  });
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  fs.writeFileSync("achieveDBv2.json", JSON.stringify(test));
  res.redirect("/");
});
// ----------전체 정보 초기화----------
app.post("/allReset", (req, res) => {
  userArr = [{}];
  memoArr = [];
  // 업적 달성 날짜 초기화
  test[0].Price.forEach((e) => {
    e.date = undefined;
  });
  test[1].Day.forEach((e) => {
    e.date = undefined;
  });
  test[2].Count.forEach((e) => {
    e.date = undefined;
  });
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  fs.writeFileSync("achieveDBv2.json", JSON.stringify(test));
  res.redirect("/");
});
// ----------사용자 정보 수정----------
app.post("/delete", upload.single("img"), function (req, res) {
  const newData = {
    userName: req.body.userName,
    BrithDayYear: req.body.BrithDayYear,
    BrithDayMonth: req.body.BrithDayMonth,
    BrithDayDay: req.body.BrithDayDay,
    Price: req.body.Price,
    CountPerDay: req.body.CountPerDay,
    StartYear: req.body.StartYear,
    StartMonth: req.body.StartMonth,
    StartDay: req.body.StartDay,
    StartHour: req.body.StartHour,
    StartMinute: req.body.StartMinute,
    EndYear: req.body.EndYear,
    EndMonth: req.body.EndMonth,
    EndDay: req.body.EndDay,
    EndHour: req.body.EndHour,
    EndMinute: req.body.EndMinute,
  };
  if (req.file) {
    newData.img = req.file.filename;
  }

  userArr.splice(0, 1, newData);

  fs.writeFileSync("userData.json", JSON.stringify(userArr));
  res.redirect("/main");
});

// ----------calendar----------
app.get("/calendar", function (req, res) {
  res.render("pages/calendar.ejs", { memoArr, modeArr, langArr });
});
// ----------calendar 메모 삭제----------
app.post("/memoDelete/:day/:id", (req, res) => {
  // 선택한 메모 값 찾기
  // 전체 메모 배열(memoArr).filter((e) 각각의 배열 값(e) 중에서 프로퍼티 키 값(Object.keys(e)이 오늘 날짜와 일치하는 것 중에서) 선택한 메모의 i(인덱스 번호 값))
  let selectMemo = memoArr.filter((e) => Object.keys(e)[0] == req.params.day)[
    req.params.id
  ];
  // 전체 메모 배열에 새로운 배열 덮어쓰기 (선택한 메모를 제외한 값)
  memoArr = memoArr.filter((e) => e !== selectMemo);
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/calendar");
});
// ----------create----------
// 달력 정보 추가
app.post("/create", function (req, res) {
  // 달력 객체 만들기
  let data = {};
  // 달력 객체 프로퍼티 키 만들기
  let dateData = req.body.date;
  dateData = "D" + dateData.split("-").join("");
  // 달력 객체 안의 정보 배열 만들기
  data[`${dateData}`] = [
    {
      감정: req.body.감정,
      욕구: req.body.욕구,
      제목: req.body.제목,
      내용: req.body.내용,
      날짜: req.body.date,
    },
  ];
  // 달력 정보 추가
  memoArr.push(data);

  // 달력 정보 업데이트
  fs.writeFileSync("./public/json/memo.json", JSON.stringify(memoArr));
  res.redirect("/calendar");
});

// ----------community 이동 페이지----------
app.get("/community", (req, res) => {
  res.render("pages/community.ejs", { modeArr, langArr });
});

// ----------chatting (채팅) 페이지----------
app.get("/chatting", function (req, res) {
  res.render("pages/chatting.ejs", {
    chattingdbArr,
    userArr,
    modeArr,
    langArr,
  });
});
// ----------chatting (채팅) create----------
app.post("/chattingcreate", function (req, res) {
  const text = req.body.text;
  const date = req.body.date;

  chattingdbArr.push({ 내용: text, 날짜: date });
  fs.writeFileSync("chattingDB.json", JSON.stringify(chattingdbArr));
  res.redirect("/chatting");
});

// ----------clinic----------
app.get("/clinic", function (req, res) {
  let name = userArr[0].userName;
  res.render("pages/clinic.ejs", { name, modeArr, langArr });
});

// ----------listen----------
// 서버 열기
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
