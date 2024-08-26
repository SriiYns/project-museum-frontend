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
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/historyScanCollection`);
                console.log('====================================');
                console.log(data.data);
                console.log('====================================');
                setHistoryCollections(data.data);                
            } catch (error) {
                if (isAxiosError(error)) {
                    toast({
                        title: 'Error',
                        description: error.response?.data?.message,
                        variant: 'destructive',
                    });
                } else {
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
