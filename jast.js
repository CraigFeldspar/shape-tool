const pkg = require("./package.json");

const RELEASE_DIR = "build/release/";
const RELEASE_CMD = "npm run release";
const APP_PORT = 3006;
const APP_NAME = pkg.name;
const APP_VERSION = pkg.version;

module.exports = {

    config: {
        "gitlab-url": "https://git.wanadev.org/",
        "gitlab-project-path": `obsidian/${APP_NAME}`,
    },

    servers: {

        "node-prod1": {
            address: "node-prod1.cl1.wanadev.lan",
            user: "wanadev",
            "remote-working-dir": `/home/wanadev/${APP_NAME}/`,
        },

    },

    tasks: {

        release: {
            steps: [{
                action: "local-commands",
                commands: [
                    RELEASE_CMD,
                    `cp jast.js ${RELEASE_DIR}`,
                    `cp .gitlab-ci.yml ${RELEASE_DIR}`,
                ],
            }, {
                action: "pm2-generate-ecosystem",
                servers: {
                    "node-prod1": {},
                },
                branch: "origin/release",
                "output-dir": RELEASE_DIR,
                env: {
                    PORT: APP_PORT,
                },
                "app-exec-mode": "cluster",
                "app-instances": 1,
            }, {
                action: "commit-release",
                "release-dir": RELEASE_DIR,
                "dest-branch": "release",
                message: `Jast release v${APP_VERSION}`,
            }],
        },

        deploy: {
            steps: [{
                action: "pm2-deploy",
                servers: [
                    "node-prod1",
                ],
            }],
        },
    },
};
