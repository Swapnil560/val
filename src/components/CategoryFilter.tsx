import { Button, Space } from 'antd';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <Space wrap>
      {categories.map((category) => (
        <Button
          key={category}
          type={selectedCategory === category ? 'primary' : 'default'}
          onClick={() => onCategoryChange(category)}
          style={{
            backgroundColor: selectedCategory === category ? '#2F1B14' : '#fff',
            borderColor: '#8B4513',
            color: selectedCategory === category ? '#fff' : '#2F1B14',
            borderRadius: '6px'
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== category) {
              e.currentTarget.style.backgroundColor = '#8B4513';
              e.currentTarget.style.color = '#fff';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== category) {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#2F1B14';
            }
          }}
        >
          {category}
        </Button>
      ))}
    </Space>
  );
}