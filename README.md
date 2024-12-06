# Блокировка загадкой

Это расширение помогает вернуть контроль над вниманием. После определённого времени на сайте появляется загадка. Реши её, чтобы продолжить, или покинь сайт. Простое и эффективное средство для сосредоточения, особенно на отвлекающих сайтах.

# Riddle Lock

This extension helps you regain control of your attention. After spending a certain amount of time on a website, a riddle appears. Solve it to continue using the site or leave. A simple and effective tool for staying focused, especially on distracting websites.

---

## Диаграмма последовательностей
```mermaid
sequenceDiagram
    participant Background as Фоновый Скрипт
    participant Content as Контентный Скрипт
    actor User as Пользователь

loop
  Content->>Background: Показать загадку для домена?

  %% домена нет в списке
  break
    Note left of Background: Кейс "Домена нет в списке"

    Background->>Content: Домена нет в списке
    Content->>Content: Выйти из цикла до смены домена сайта
  end

  alt
    Note left of Background: Кейс "Есть время БЕЗ загадки"

    Background->>Content: Нет, время без загадки ещё не вышло
    Content->>User: Загадку НЕ показывать
    User->>User: Пользуется сайтом
    Note over User: Вернуться к шагу "Показать загадку для домена?"
  end

  Background->>Content: Да, вот загадка
  Content->>User: Показать модальное окно с загадкой
  User->>Content: Вводит ответ
  Content->>Background: Отправить результат

  Background->>Background: Проверить ответ

  %% Успешное решение
  Note left of Background: Кейс "Успешное решение"

  Background->>Background: Сброс таймера для показа следующей загадки
  Background->>Content: Оповещает, что ответ правильный
  Content->>User: Уведомление об успехе и закрыть окно

  %% Неудачное решение
  alt
    Note left of Background: Кейс "Неудачное решение"

    Background->>Content: Ответ неправильный
    Content->>User: Уведомить об ошибке и показать другую задачку
    Note over User: Вернуться к шагу пользователя "Вводит ответ"
  end

  %% Пользователь уходит с сайта
  alt 
    Note left of Background: Кейс "Уход с сайта"

    User->>User: Закрыть страницу сайта
  end

end
```
