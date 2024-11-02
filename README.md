# project_template

# Make sure to fill out the README with the information specified in the project description!

## How to deploy
In order to deploy onto the ugrad servers (i.e `<CWL>@pender.students.cs.ubc.ca` or `<CWL>@remote.students.cs.ubc.ca`)
please follow these steps:

1. Have the repository on your ugrad server. This can be achieved either through using git and pulling the files directly
from the server, or uploading the project directory manually through something like Cyberduck. If you would like to set 
it up to directly pull from the git repository, you can follow <a href="https://medium.com/@kyledeguzmanx/quick-step-by-step-guide-to-generating-an-ssh-key-in-github-d3c6f7e185bb" target="_blank">this</a>
guide.


2. Run 
   ```
   npm run build
   ```

    locally within the `/frontend` folder. This will generate a `/build` directory located at `/frontend/build`.
3. Upload this newly generated `build` directory to `/frontend` in the project on the ugrad server.
4. Make sure the `.env` file on the ugrad server has the correct credentials for the database. i.e. change
    ```
    ORACLE_USER=ora_YOUR-CWL-USERNAME
    ORACLE_PASS=aYOUR-STUDENT-NUMBER
    ```
5. Run 

   ```
   sh remote-start.sh
   ```
   on the project in the ugrad server. If this is successful, it should say
   ```
   Updated ./.env with PORT=<PORT NUMBER>.
   Server running at http://localhost:<PORT NUMBER>/
   Connection pool started
   ```
   Take note of the `PORT NUMBER` as we will need it in the next step.
6. Now we need to build an SSH tunnel. In the root folder of the project on your device, if you are on Mac, run:
   ```
   sh ./scripts/mac/server-tunnel.sh
   ```
   or if you are on Windows, run:
   ```
   .\scripts\win\server-tunnel.cmd
   ```
   It will prompt you with
   ```
   Enter your remote Node starting port number: 
   ```
   to which you need to enter the `PORT NUMBER` from the previous step. It will then prompt you for your CWL and password.
   After entering those, you should be able to access the application from 
   ```
   http://localhost:<PORT NUMBER>
   ```