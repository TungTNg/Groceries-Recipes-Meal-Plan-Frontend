# Groceries - Recipes - Meal Plans React App

General info about the app

## Cloud Architecture

The React front-end Groceries - Recipes - Meal Plans app was created and maintained using the following **AWS** Cloud Resources:

- 1 set of AWS public **Virtual Private Cloud**: 1 VPC + 2 Subnets + 1 Route Table + 1 Network Connection (Internet Gateway)

- 1 set of AWS **Security Groups Policy** to allow public internet traffic to access the EC2 instance.

- 1 AWS **EC2** instance (ubuntu 20.04) functions as a web server to serve static HTML/CSS/Javascript files (compiled using `npm run build` within the React app).

- 1 AWS **Elastic IP Address** attached to the EC2 instance so that the public IP address of the React app will not change in case of a sudden server shutdown.

### Create AWS VPC

Visit [AWS Official Document](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-getting-started.html) to learn how to create a new or use the default VPC:

### Create AWS Security Group Policy

Visit [AWS Official Document](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html) for more details.

The EC2 instance should have these inbound ports open:

- 443: used for https
- 80: used for http
- 22: used for ssh

### Create AWS EC2 Instance

Visit [AWS Official Document](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html) on how to create an AWS EC2 instance. We used `ubuntu 20.04` for our server's operating system.

Once the server has been created, ssh into the server and install these 2 items:

1. git clone for `https://github.com/TungTNg/Groceries-Recipes-Meal-Plan-Frontend` inside the user home directory. In our case it was `/home/ubuntu`
2. install nginx to serve the static files compiled by React. The snippet for the setting listed below is the one we used:

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
                root /home/ubuntu/Groceries-Recipes-Meal-Plan-Frontend/build;
        server_name _;
        location / {
                try_files $uri $uri/ =404;
        }
}
```

### Create AWS Elastic IP Address

Visit [AWS Official Document](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html) for how to create an Elastic IP Address and attach it to your EC2 instance

## Continuous Integration / Continuous Delivery (CI/CD)

The React front-end Groceries - Recipes - Meal Plans app uses [GitHub Actions](https://github.com/features/actions) for both CI & CD pipelines. Continuous Integration (CI) pipeline will run checks for new PR requesting to be merged into `main`. Continuous Delivery (CD) pipeline will deploy code changes to production server once the PR has been merged.

### Continuous Integration (CI) Pipeline

The workflow `.yml` file for CI is inside `.github/workflows` folder, named `test.workflow.yml`. With this workflow file, GitHub Actions's runner will run these checks once a PR is being opened or if there is a new commit pushed to that PR:

- `npm run test`: This will run all of the Jest/React Testing Library test files/cases inside the project
- `npm run lint`: This will check code format for the project

This workflow use [GitHub Action - setup-node package](https://github.com/actions/setup-node)

### Continuous Delivery (CD) Pipeline

The workflow `.yml` file for CD is inside `.github/workflows` folder, named `deploy.workflow.yml`. With this workflow file, GitHub Actions's runner will ssh into the production server and run these command lines:

- `cd ~/Groceries-Recipes-Meal-Plan-Frontend/`: Go into the project folder, residing in `ubuntu` user `home` folder
- Check out the newly updated remote `main` branch, pull in the latest code changes and do a fresh `npm build` with:

```
git checkout main
git fetch --all
git reset --hard origin/main
git pull origin main
npm install
npm run build
```

- `sudo service nginx restart`: Restart nginx server since nginx will be the main web server to serve static, compiled HTML/CSS/Javascript files inside the `build` folder

This workflow use [GitHub Action - Appleboy's ssh-action](https://github.com/appleboy/ssh-action)

In order for the Action to able to access & ssh to the production server, please add these `secrets` into the Github project settings:

- `SSH_HOST`: public accessible IP address of the production server
- `SSH_KEY`: ssh key of authorized user for the server
- `SSH_PORT`: 22 (default port for ssh)
- `SSH_USERNAME`: authorized username that can use the ssh key, in my case it was `ubuntu`

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
