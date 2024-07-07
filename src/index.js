#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const inquirer = require("inquirer");
const registrys = require("../registrys.json");
const { execSync } = require("child_process");
const { program } = require("commander");
const paths = path.join(__dirname, "../", "./package.json");
const file = JSON.parse(fs.readFileSync(paths));

const getcurrentRegistry = () => {
  return execSync("npm config get registry");
};
const setRegistry = (url) => {
  return execSync(`npm config set registry ${url}`);
};
program.version(file.version, "-v", "查看版本号");
program
  .command("current")
  .alias("c")
  .description("查看当前镜像源")
  .action(async () => {
    const registry = await getcurrentRegistry().toString().trim();
    const item = registrys.find((item) => item.value == registry);
    console.log(chalk.blue(`${item.name}`));
  });
program
  .command("list")
  .alias("ls")
  .description("查看所有镜像源")
  .action(() => {
    registrys.forEach((item) => {
      console.log(chalk.hex("#11a8cd").bold(`${item.name}`));
    });
  });
program
  .command("add")
  .alias("a")
  .description("新增镜像源")
  .action(() => {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "请输入名称",
        },
        {
          name: "url",
          type: "input",
          message: "请输入地址",
        },
      ])
      .then((item) => {
        const index = registrys.findIndex((data) => data.name == item.name);
        if (index > -1) {
          throw new Error("名称已存在");
        }

        const lastIndex = item.url.length - 1;
        const str = item.url[lastIndex];
        if (str == "/") {
          const url = item.url.split("");
          url.splice(lastIndex, 1);
          item.url = url.join("");
        }
        registrys.push({
          name: item.name,
          value: item.url + "/",
          url: item.url,
        });

        const filePath = path.join(__dirname, "../registrys.json");
        fs.promises.writeFile(filePath, JSON.stringify(registrys));
      });
  });

program
  .command("delete")
  .alias("d")
  .description("删除镜像源")
  .action(() => {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "请输入要删除的镜像源名称",
        },
        {
          name: "isDel",
          type: "confirm",
          message: "确认删除吗",
        },
      ])
      .then(async (res) => {
        if (res.isDel) {
          const index = registrys.findIndex((data) => data.name == res.name);
          if (index > -1) {
            const registry = await getcurrentRegistry().toString().trim();
            const item = registrys.find((item) => item.value == registry);
            const item1 = registrys[index];
            if (item1.name == item.name) {
              throw new Error("不能删除当前使用的镜像源");
            } else {
              registrys.splice(index, 1);
            }
          }
          const filePath = path.join(__dirname, "../registrys.json");
          fs.promises.writeFile(filePath, JSON.stringify(registrys));
        }
      });
  });
program
  .command("use")
  .description("请选择使用镜像源")
  .action(async () => {
    inquirer
      .prompt([
        {
          name: "registry",
          type: "list",
          message: "请选择镜像源",
          choices: registrys,
        },
      ])
      .then(async (res) => {
        await setRegistry(res.registry);
      });
  });
program
  .command("update")
  .alias("u")
  .description("更新镜像源")
  .action(async () => {
    inquirer
      .prompt([
        {
          name: "registry",
          type: "list",
          message: "请选择镜像源",
          choices: registrys,
        },
        {
          name: "name",
          type: "input",
          message: "请输入要更新的镜像源名称(非必填)",
        },
        {
          name: "url",
          type: "input",
          message: "请输入要更新的镜像源地址(非必填)",
        },
      ])
      .then(async (res) => {
        const index = registrys.findIndex((data) => data.value == res.registry);
        const item = registrys[index];
        const lastIndex = res.registry.lastIndexOf("/");
        if (lastIndex > -1) {
          const url = res.registry.split("");
          url.splice(lastIndex, 1);
          res.registry = url.join("");
        }
        item.name = res.name ? res.name : item.name;
        item.value = res.registry ? res.registry + "/" : item.value;
        item.url = res.registry ? res.registry : item.url;
        const filePath = path.join(__dirname, "../registrys.json");
        fs.promises.writeFile(filePath, JSON.stringify(registrys));
      });
  });
program.parse(process.argv);
