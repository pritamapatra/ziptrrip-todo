const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DB_PATH = path.join(__dirname, "../../data/todos.json");

const readTodos = async () => {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
};

const writeTodos = async (todos) => {
    await fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2));
};

const getAllTodos = async (req, res) => {
    try {
        const todos = await readTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: "Failed to read todos" });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todos = await readTodos();
        const todo = todos.find((t) => t.id === req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: "Failed to read todo" });
    }
};

const createTodo = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });
        const todos = await readTodos();
        const newTodo = {
            id: uuidv4(),
            title,
            description: description || "",
            dueDate: dueDate || null,
            priority: priority || "Medium",
            isCompleted: false,
            createdAt: new Date().toISOString(),
        };
        todos.push(newTodo);
        await writeTodos(todos);
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: "Failed to create todo" });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todos = await readTodos();
        const index = todos.findIndex((t) => t.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: "Todo not found" });
        todos[index] = { ...todos[index], ...req.body };
        await writeTodos(todos);
        res.json(todos[index]);
    } catch (err) {
        res.status(500).json({ error: "Failed to update todo" });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todos = await readTodos();
        const filtered = todos.filter((t) => t.id !== req.params.id);
        if (filtered.length === todos.length)
            return res.status(404).json({ error: "Todo not found" });
        await writeTodos(filtered);
        res.json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };