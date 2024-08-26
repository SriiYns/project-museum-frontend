import * as React from 'react';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

const useHistoryCollection = () => {
    const { toast } = useToast();
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [historyCollections, setHistoryCollections] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const { data } = await axios.get('/historyScanCollection');
                setHistoryCollections(data.data); // Adjust if API response structure is different
            } catch (error) {
                if (isAxiosError(error)) {
                    setError(error.response?.data?.message || 'An unexpected error occurred');
                    toast({
                        title: 'Error',
                        description: error.response?.data?.message || 'An unexpected error occurred',
                        variant: 'destructive',
                    });
                } else {
                    setError(error.message);
                    toast({
                        title: 'Error',
                        description: error.message,
                        variant: 'destructive',
                    });
                }
                console.error('Error fetching history collections:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [toast]);

    return {
        loading,
        error,
        historyCollections,
    };
};

export default useHistoryCollection;
