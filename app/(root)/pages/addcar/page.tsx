'use client';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddCarStep from '@/components/AddCar/addCarStep';

const AddCarPage = () => {
    const router = useRouter();
    const toast = useRef<Toast>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [carData, setCarData] = useState({
        plateNumber: '',
        brand: '',
        carType: '',
        carModel: '',
        color: '',
        year: '',
        engine: '',
        category: '',
        registrationNumber: '',
        chassisNumber: '',
        weight: '',
        seats: '',
        rentalPricePerDay: '',
        rentalPricePerMonth: '',
        deposit: '',
        registrationFee: '',
        insuranceFee: '',
        roadTaxFee: '',
        department: '',
        staff: '',
        image: null
    });

    const onInputChange = (field: string, value: any) => {
        setCarData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNext = () => {
        setSubmitted(true);

        // Validate required fields based on current step
        if (activeIndex === 0) {
            if (
                !carData.plateNumber ||
                !carData.brand ||
                !carData.carType ||
                !carData.color ||
                !carData.year
            ) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'ຜິດພາດ',
                    detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                    life: 3000
                });
                return;
            }
        } else if (activeIndex === 1) {
            if (!carData.category || !carData.department) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'ຜິດພາດ',
                    detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                    life: 3000
                });
                return;
            }
        }

        setActiveIndex(activeIndex + 1);
    };

    const handleBack = () => {
        setActiveIndex(activeIndex - 1);
    };

    const handleSubmit = () => {
        setSubmitted(true);

        // ตรวจสอบฟิลด์ที่จำเป็น
        if (
            !carData.plateNumber ||
            !carData.brand ||
            !carData.carType ||
            !carData.color ||
            !carData.year ||
            !carData.category ||
            !carData.department
        ) {
            toast.current?.show({
                severity: 'error',
                summary: 'ຜິດພາດ',
                detail: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                life: 3000
            });
            return;
        }

        // TODO: ส่งข้อมูลไปยัง API
        console.log('Car Data:', carData);

        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ເພີ່ມຂໍ້ມູນລົດສຳເລັດ',
            life: 3000
        });

        // Redirect กลับไปหน้ารายการ
        setTimeout(() => {
            router.push('/admin/cars');
        }, 2000);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    <h5>ເພີ່ມຂໍ້ມູນລົດ</h5>

                    <AddCarStep
                        carData={carData}
                        onInputChange={onInputChange}
                        submitted={submitted}
                        activeIndex={activeIndex}
                        onStepChange={setActiveIndex}
                    />

                    {/* Navigation Buttons */}
                    <div className="flex justify-content-between mt-4">
                        <Button
                            label="ກັບຄືນ"
                            icon="pi pi-arrow-left"
                            onClick={handleBack}
                            disabled={activeIndex === 0}
                            className="p-button-secondary"
                        />

                        {activeIndex < 2 ? (
                            <Button
                                label="ຕໍ່ໄປ"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                onClick={handleNext}
                            />
                        ) : (
                            <Button
                                label="ບັນທຶກ"
                                icon="pi pi-check"
                                onClick={handleSubmit}
                                style={{ backgroundColor: '#007bff', border: 'none' }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCarPage;
