import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createTranslator, isLocale, languageFromCookie } from "../src/lib/i18n/shared.ts";
import { localAnswer } from "../src/lib/chat/local-answer.ts";
import { profile } from "../src/data/profile.ts";
import { projects } from "../src/data/projects.ts";
import { cases } from "../src/lib/chat/context.ts";

const readMessages = (file) => JSON.parse(readFileSync(new URL(`../src/data/i18n/${file}`, import.meta.url), "utf8"));
const server = readMessages("en.json");
const client = readMessages("en-client.json");
const messages = { ...server, ...client };
const english = createTranslator(messages);

test("language preference accepts only the supported cookie and defaults to Spanish", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("es"), true);
  assert.equal(isLocale("en-US"), false);
  assert.equal(languageFromCookie(null), "es");
  assert.equal(languageFromCookie("other=en; portfolio-language=en"), "en");
  assert.equal(languageFromCookie("portfolio-language=es; other=en"), "es");
  assert.equal(languageFromCookie("portfolio-language=fr"), "es");
  assert.equal(languageFromCookie("fake-portfolio-language=en"), "es");
});

test("translation preserves whitespace, unknown names and interpolation values", () => {
  assert.equal(english("  Inicio \n"), "  Home \n");
  assert.equal(english("Baleària"), "Baleària");
  assert.equal(english("React"), "React");
  assert.equal(english("constructor"), "constructor");
  assert.equal(english(undefined), undefined);
  assert.equal(english(""), "");
  assert.equal(english("Puedes volver a enviar en {0} s.", [8]), "You can send another message in 8 s.");
  assert.equal(english("Me llamo {0}.", ["{1}<script>"]), "My name is {1}<script>.");
  assert.equal(createTranslator({})(profile.headline), profile.headline);
});

test("catalogs are disjoint and preserve every numbered placeholder", () => {
  assert.equal(Object.keys(server).some((key) => Object.hasOwn(client, key)), false);
  for (const [key, value] of Object.entries(messages)) {
    assert.deepEqual(value.match(/\{\d+\}/g)?.sort() ?? [], key.match(/\{\d+\}/g)?.sort() ?? [], key);
  }
});

test("English covers the profile, case narratives and their confidentiality notes", () => {
  for (const text of [profile.headline, profile.introduction, profile.approach]) {
    assert.ok(Object.hasOwn(messages, text), text);
  }
  for (const project of projects) {
    for (const text of [project.title, project.summary, ...Object.values(project.executiveSummary)]) {
      assert.ok(Object.hasOwn(messages, text), text);
    }
  }
  for (const { content } of cases) {
    if ("confidentiality" in content) assert.ok(Object.hasOwn(messages, content.confidentiality));
    for (const section of Object.values(content)) {
      if (section && typeof section === "object" && "paragraphs" in section) {
        for (const paragraph of section.paragraphs) assert.ok(Object.hasOwn(messages, paragraph), paragraph);
      }
    }
  }
});

test("local assistant answers and refusals follow the selected language", () => {
  const question = (content) => [{ role: "user", content }];
  assert.match(localAnswer(question("experience"), english), /^I work as/);
  assert.match(localAnswer(question("education"), english), /^My education:/);
  assert.match(localAnswer(question("projects"), english), /^I have worked on these projects:/);
  assert.match(localAnswer(question("contact"), english), /^You can email me at/);
  assert.match(localAnswer(question("salary"), english), /^I can tell you about/);
  assert.match(localAnswer(question("experiencia")), /^Trabajo como/);
});
