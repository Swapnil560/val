import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearch }: SearchBarProps) {
  return (
    <Input
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      prefix={<SearchOutlined />}
      size="large"
      style={{ width: '100%' }}
    />
  );
}