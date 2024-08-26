import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios'; // Ganti dengan 'axios' jika menggunakan URL langsung

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import StatisticCard from '@/components/statistic-card';
import useCollection from '@/hooks/useCollection';
import { useNavigate } from 'react-router-dom';
import useUser from '@/hooks/useUser';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { loading, error, collections } = useCollection();
    const { loading: loadingUser, error: errorUser, users } = useUser();
    const [scanCounts, setScanCounts] = useState({});
    const [lastScans, setLastScans] = useState({});

    React.useEffect(() => {
        if (error || errorUser) navigate('/admin/dashboard');
    }, [error, errorUser, navigate]);

    useEffect(() => {
        const fetchScanData = async () => {
            const counts = {};
            const lastScans = {};
            for (const collection of collections) {
                try {
                    const [countResponse, lastScanResponse] = await Promise.all([
                        axios.get(`/historyScanCollection/${collection._id}/count`),
                        axios.get(`/historyScanCollection/${collection._id}/lastScan`),
                    ]);
                    counts[collection._id] = countResponse.data.count;
                    lastScans[collection._id] = lastScanResponse.data.scanDate;
                } catch (error) {
                    console.error('Error fetching scan data', error);
                    counts[collection._id] = 0;
                    lastScans[collection._id] = null;
                }
            }
            setScanCounts(counts);
            setLastScans(lastScans);
        };

        if (collections.length > 0) {
            fetchScanData();
        }
    }, [collections]);

    const statistics = React.useMemo(() => {
        if (!collections) return [];

        return [
            {
                title: 'Total Koleksi',
                value: collections.length,
                description: 'Jumlah koleksi yang ada di museum',
            },
            {
                title: 'Total Kategori',
                value: new Set(collections.map((collection) => collection.kategori)).size,
                description: 'Jumlah kategori yang ada di museum',
            },
        ];
    }, [collections]);

    if (loading || loadingUser) {
        return (
            <div className='flex justify-center min-h-screen pt-20'>
                Loading...
            </div>
        );
    }

    return (
        <div className='space-y-8'>
            <Header
                title='Dashboard'
                description='Dashboard Museum Nusa Tenggara Barat.'
            />

            <div className='grid gap-8 md:grid-cols-1 lg:grid-cols-2'>
                {statistics.map((statistic, index) => (
                    <StatisticCard key={index} data={statistic} />
                ))}
            </div>

            <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                <Card className='w-full md:w-1/2'>
                    <CardHeader className='flex flex-row items-center'>
                        <div className='grid gap-2'>
                            <CardTitle>User Terbaru</CardTitle>
                            <CardDescription>
                                User Terbaru yang telah dibuat.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama</TableHead>
                                    <TableHead className='text-right'>
                                        Email
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow
                                        key={user._id}
                                        className='bg-white'>
                                        <TableCell className='font-medium'>
                                            {user.name}
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            {user.email}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className='flex flex-col gap-4 w-full md:w-1/2'>
                    <Card className='w-full'>
                        <CardHeader className='flex flex-row items-center'>
                            <div className='grid gap-2'>
                                <CardTitle>Koleksi Terbaru</CardTitle>
                                <CardDescription>
                                    Koleksi Terbaru yang telah dibuat.
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead className='text-right'>
                                            Kategori
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            Tahun
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {collections.map((collection) => (
                                        <TableRow
                                            key={collection._id}
                                            className='bg-white'>
                                            <TableCell className='font-medium'>
                                                {collection.judul_id ||
                                                    collection.judul_en ||
                                                    collection.judul_sasak}
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Badge>{collection.kategori}</Badge>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                {collection.tahun}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className='w-full'>
                        <CardHeader className='flex flex-row items-center'>
                            <div className='grid gap-2'>
                                <CardTitle>Riwayat Pengaksesan QR Code</CardTitle>
                                <CardDescription>
                                    Histori Koleksi Terbaru.
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead className='text-left'>
                                            Collection Name
                                        </TableHead>
                                        <TableHead className='text-right'>
                                            Scan Count
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {collections.map((collection) => (
                                        <TableRow
                                            key={collection._id}
                                            className='bg-white'>
                                            <TableCell className='font-medium'>
                                                {lastScans[collection._id]
                                                    ? new Date(lastScans[collection._id]).toLocaleString()
                                                    : 'No scans yet'}
                                            </TableCell>
                                            <TableCell className='font-medium'>
                                                {collection.judul_id ||
                                                    collection.judul_en ||
                                                    collection.judul_sasak}
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <p className='text-muted-foreground'>
                                                    {scanCounts[collection._id] || 0}
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
