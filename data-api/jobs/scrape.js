module.exports = function (cron) {
 
  let number = 0;
  function printNumbers() {
    console.log('Hello :: ',number);
    number++;
  }
  function resetNumber() {
    console.log('Task Hello Completed');
    number = 0;
  }
 
  let helloJob = new cron.CronJob({
    cronTime : '1 * * * * *',  // The time pattern when you want the job to start
    onTick : printNumbers, // Task to run
    onComplete : resetNumber, // When job is completed and It stops.
    start : true, // immediately starts the job.
    // The timezone
  });
 
  return helloJob;
 
};