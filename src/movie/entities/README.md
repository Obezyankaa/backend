## 📦 MovieEntity (Таблица: movies)

| Поле          | Тип данных      | Описание                                                                                                   |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`          | `string` (UUID) | Уникальный идентификатор фильма. Генерируется автоматически (UUID).                                        |
| `title`       | `string`        | Название фильма. Обязательное поле, максимум 128 символов.                                                 |
| `description` | `string`        | Описание фильма. Может быть пустым (`nullable`) не обязательное поле.                                      |
| `releaseYear` | `number`        | Год выпуска фильма. Целое число, не может быть отрицательным (`unsigned`).                                 |
| `genre`       | `enum`          | жанр фильма (enum: ACTION, COMEDY, DRAMA, HORROR)                                                          |
| `rating`      | `number`        | Рейтинг фильма по шкале от 0.0 до 9.9. Тип `decimal(3,1)`. По умолчанию `0.0`.                             |
| `genre`       | `enum`          | жанр фильма (enum: ACTION, COMEDY, DRAMA, HORROR)                                                          |
| `reviews`     | `ReviewEntity[]`| Список отзывов (связь один-ко-многим).                                                                     |
| `idAvailable` | `boolean`       | Флаг, публичен ли фильм. По умолчанию `false`.                                                             |
| `createdAt`   | `Date`          | Дата и время создания записи. Устанавливается автоматически.                                               |
| `updaredAt`   | `Date`          | Дата и время последнего обновления. Устанавливается автоматически. **(Опечатка: должно быть `updatedAt`)** |

---

## 🛠️ Используемые декораторы

* `@Entity({ name: 'movies' })` — сообщает TypeORM, что этот класс представляет таблицу `movies`.
* `@PrimaryColumn()` — указывает, что поле `id` является первичным ключом.
* `@Generated('uuid')` — автоматическая генерация UUID для `id`.
* `@Column()` — описывает обычные столбцы таблицы.
* `@CreateDateColumn()` — автоматически записывает дату создания записи.
* `@UpdateDateColumn()` — автоматически обновляет дату при изменении записи.

---

## 📚 Полезные ссылки

* [TypeORM Entity Docs](https://typeorm.io/entities)
* [NestJS + TypeORM Guide](https://docs.nestjs.com/techniques/database)

---

📦 MovieEntity (Таблица: movies)

@Entity({ name: 'movies' })
export class MovieEntity { ... }

🔑 Поля:

Поле	Тип	Описание
id	uuid	Уникальный идентификатор (генерируется автоматически).
title	varchar(128)	Название фильма.
description	text	Описание фильма (необязательное поле).
releaseYear	int	Год выхода. Положительное число (unsigned).
rating	decimal(3,1)	Оценка (например, 7.5). По умолчанию 0.0.
isAvaildble	boolean	Доступен ли фильм. По умолчанию false. ❗️В слове ошибка, правильнее isAvailable.
genre	enum	Жанр фильма (enum: ACTION, COMEDY, DRAMA, HORROR).
reviews	ReviewEntity[]	Список отзывов (связь один-ко-многим).
relaseDate	date	Дата выхода (❗️опечатка в названии — releaseDate).
createdAt	timestamp	Дата создания записи.
updatedAt	timestamp	Дата последнего обновления.



⸻

📝 ReviewEntity (Таблица: reviews)

@Entity({ name: 'reviews' })
export class ReviewEntity { ... }

🔑 Поля:

Поле	Тип	Описание
id	uuid	Уникальный ID отзыва.
text	text	Текст отзыва.
rating	decimal(3,1)	Оценка за фильм.
movieId	uuid	Внешний ключ на фильм.
movie	MovieEntity	Связь с фильмом (многие ко одному).
createdAt	timestamp	Дата создания.
updatedAt	timestamp	Дата обновления.



⸻

🔗 Связь между таблицами
	•	Movie (1) ↔ (M) Review
Один фильм может иметь много отзывов.
	•	В ReviewEntity есть внешний ключ movieId, а также @ManyToOne связь, которая указывает на MovieEntity.
	•	Указан onDelete: 'CASCADE', значит при удалении фильма все связанные отзывы тоже будут удалены.

⸻

⚙️ Пояснение про @Column()

Аннотация @Column() указывает, как конкретное поле мапится в БД:

Настройка	Назначение
type	Тип поля в БД (varchar, text, int, boolean, date, decimal, enum и т.д.)
length	Максимальная длина (только для varchar)
nullable	Разрешено ли значение null
default	Значение по умолчанию
unsigned	Только положительные числа (для int)
precision, scale	Для decimal: precision — общее количество цифр, scale — сколько из них после запятой
name	Кастомное имя колонки в БД
