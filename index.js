const disk = require("diskusage");

//This number represents the threshold at which
//the alertMarc() function will be run. if the
//percentage of free space on the disk falls
//below this number, the function will be run
const percentageFreeThreshold = 10;

async function alertMarc(freeSpace) {
  //put whatever you like in this function

  console.log(
    `The amount of free space (${freeSpace}%) has fallen below the allowed threshold: ${percentageFreeThreshold}%`
  );
}

function getDiskInfo() {
  return new Promise((res, rej) => {
    disk.check("/", function (err, info) {
      if (err) rej(err);

      res(info);
    });
  });
}

async function percenageOfRootFree() {
  const diskInfo = await getDiskInfo();
  const percentageFree = (diskInfo.free / diskInfo.total) * 100;

  return Number(percentageFree.toFixed(2));
}

async function main() {
  let freeSpace = await percenageOfRootFree();

  if (freeSpace < percentageFreeThreshold) {
    await alertMarc(freeSpace);
  } else {
    console.log(
      `Free space (${freeSpace}%) has not fallen below the allowed threshold: ${percentageFreeThreshold}%`
    );
  }
}

main().catch(console.log);
