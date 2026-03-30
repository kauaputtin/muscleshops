const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Erro ao buscar categorias:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    if (!name) return res.status(400).json({ message: 'Nome é obrigatório' });

    const category = new Category({ name, parent });
    await category.save();
    res.json(category);
  } catch (err) {
    console.error('Erro ao criar categoria:', err);
    res.status(500).json({ message: 'Erro ao criar categoria', error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    if (!name) return res.status(400).json({ message: 'Nome é obrigatório' });

    const category = await Category.findByIdAndUpdate(req.params.id, { name, parent }, { new: true });
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });

    res.json(category);
  } catch (err) {
    console.error('Erro ao atualizar categoria:', err);
    res.status(500).json({ message: 'Erro ao atualizar categoria', error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });

    res.json({ message: 'Categoria deletada' });
  } catch (err) {
    console.error('Erro ao deletar categoria:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};