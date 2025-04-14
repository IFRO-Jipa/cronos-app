# Cronos App

[![GitHub Actions Workflow Status][badge-gh-actions-wf-cicd-src]][badge-gh-actions-wf-cicd-href]

[![GitHub last commit (branch)][badge-gh-last-commit-src]][badge-gh-last-commit-href]
[![GitHub Repo stars][badge-gh-repo-stars-src]][badge-gh-repo-stars-href]

<!--  -->

[badge-gh-actions-wf-cicd-src]: https://img.shields.io/github/actions/workflow/status/ifro-jipa/cronos-app/ci-cd.yml?style=for-the-badge&logo=githubactions&logoColor=white&label=Continous%20Integration&labelColor=%23010409
[badge-gh-actions-wf-cicd-href]: https://github.com/IFRO-Jipa/cronos-app/actions/workflows/ci-cd.yml

<!--  -->

[badge-gh-last-commit-src]: https://img.shields.io/github/last-commit/ifro-jipa/cronos-app/main?style=for-the-badge&labelColor=%23010409&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1naXQtY29tbWl0LWhvcml6b250YWwtaWNvbiBsdWNpZGUtZ2l0LWNvbW1pdC1ob3Jpem9udGFsIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIi8+PGxpbmUgeDE9IjMiIHgyPSI5IiB5MT0iMTIiIHkyPSIxMiIvPjxsaW5lIHgxPSIxNSIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxMiIvPjwvc3ZnPg==
[badge-gh-last-commit-href]: https://github.com/IFRO-Jipa/cronos-app/commits/main/

<!--  -->

[badge-gh-repo-stars-src]: https://img.shields.io/github/stars/ifro-jipa/cronos-app?style=for-the-badge&labelColor=%23010409&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zdGFyLWljb24gbHVjaWRlLXN0YXIiPjxwYXRoIGQ9Ik0xMS41MjUgMi4yOTVhLjUzLjUzIDAgMCAxIC45NSAwbDIuMzEgNC42NzlhMi4xMjMgMi4xMjMgMCAwIDAgMS41OTUgMS4xNmw1LjE2Ni43NTZhLjUzLjUzIDAgMCAxIC4yOTQuOTA0bC0zLjczNiAzLjYzOGEyLjEyMyAyLjEyMyAwIDAgMC0uNjExIDEuODc4bC44ODIgNS4xNGEuNTMuNTMgMCAwIDEtLjc3MS41NmwtNC42MTgtMi40MjhhMi4xMjIgMi4xMjIgMCAwIDAtMS45NzMgMEw2LjM5NiAyMS4wMWEuNTMuNTMgMCAwIDEtLjc3LS41NmwuODgxLTUuMTM5YTIuMTIyIDIuMTIyIDAgMCAwLS42MTEtMS44NzlMMi4xNiA5Ljc5NWEuNTMuNTMgMCAwIDEgLjI5NC0uOTA2bDUuMTY1LS43NTVhMi4xMjIgMi4xMjIgMCAwIDAgMS41OTctMS4xNnoiLz48L3N2Zz4=
[badge-gh-repo-stars-href]: https://github.com/IFRO-Jipa/cronos-app/stargazers

Visualize os horários de aula do campus de forma simples e interativa ✨

## Sobre

O Cronos App foi criado no intuito de tornar simples a visualização de horários de aula no IFRO Campus Ji-Paraná.

Sem anúncios, leve e com salvamento offline.

Este app é uma continuação moderna e melhorada do antigo [Horários IFRO Jipa](https://github.com/horarios-app) - aplicação web criada pelo alumni [Gabriel R. Antunes](https://github.com/guesant).

## Sistemas

### data/v1/db

Banco de dados SQLITE3 que armazena todas as informações extraídas.

### front-end

Aplicação front-end Web feita com React e MUI.

Diretório: [./front-end](./front-end/)

## Fonte de Dados

Atualmente, o Cronos funciona apenas como um visualizador de horários que estão disponíveis em uma planilha pública no Google Docs.

- [Planilha de Aulas - Google Spreadsheets](https://docs.google.com/spreadsheets/d/1pZ5Ok7YUO9OEatllR7s1UfOaYJF03ULtRcDcd-YHnIA/)

- [Menu de Visualização dos Horários de Aulas - Google Presentation](https://docs.google.com/presentation/d/e/2PACX-1vQP-b0NoFv9j2d-T2UamzdqlF7uoxOfDaH5CNU68aJCB7E8tePY4F8ABeYkZVotWPr1Z4UOG7spk9tL/pub?start=false&loop=true&delayms=3000#slide=id.g1dcb910429c_0_0)

## Licença

[MIT](./LICENSE)

- Copyright (c) 2025 Instituto Federal de Rondônia - Campus Ji-Paraná

- Copyright (c) 2025 Gabriel Rodrigues Antunes <gabrielrodantunes@gmail.com>

- Copyright (c) 2025 Anna Isabela Bianchini Pontuschka <annaisabelapont@gmail.com>
