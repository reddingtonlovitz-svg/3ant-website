# Site Rewrite Workspace

Этот набор файлов нужен для подготовки изменений сайта без правок самого сайта.

Цель:
- собрать новый контент по страницам;
- зафиксировать, что именно нужно заменить, удалить или добавить;
- сделать структуру понятной для любой нейросети, разработчика или редактора;
- вести работу по страницам, не смешивая всё в один файл.

Как использовать:
1. Сначала заполняем [01-global-content.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/01-global-content.md).
2. Затем идём по страницам в папке `pages/`.
3. В каждом файле страницы описываем:
   - что оставить;
   - что убрать;
   - что переписать;
   - какие новые блоки добавить;
   - какой нужен SEO-текст;
   - какие CTA и формы должны быть на странице.
4. Когда контент будет готов, эти файлы можно использовать как техническое задание для переписывания сайта.

Принцип работы:
- сайт пока не меняем;
- этот каталог является черновиком и источником правды для будущих правок;
- если по какому-то блоку нет решения, пишем `TODO`;
- если есть сомнение, фиксируем варианты прямо в нужном файле страницы.

Структура:
- [00-workflow-rules.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/00-workflow-rules.md) - правила заполнения
- [01-global-content.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/01-global-content.md) - общая информация о компании, позиционировании и сквозных элементах
- [02-change-log.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/02-change-log.md) - журнал решений
- `pages/` - отдельный файл на каждую страницу

Маршруты сайта:
- `/`
- `/services`
- `/approach`
- `/cases`
- `/blog`
- `/blog/:slug`
- `/contacts`

Страницы для заполнения:
- [home.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/pages/home.md)
- [services.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/pages/services.md)
- [approach.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/pages/approach.md)
- [cases.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/pages/cases.md)
- [blog.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/pages/blog.md)
- [blog-posts.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/pages/blog-posts.md)
- [contacts.md](/C:/Antigravity/Marketing%20Agency/docs/site-rewrite/pages/contacts.md)
