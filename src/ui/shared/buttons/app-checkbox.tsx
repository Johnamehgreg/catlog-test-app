import { Box } from '@/components/ui/box';
import { CheckIcon } from '@/components/ui/icon';
import { s } from '@core/utils/scale';
import React from 'react';

interface Props {
    checked: boolean
}

export const AppCheckbox: React.FC<Props> = ({ checked }) => {
    return (
        <>
            {checked ? (
                <Box className='rounded-full border-[#39B588] border-[2px] overflow-hidden size-[18px] items-center justify-center bg-[#39B588]'>
                    <CheckIcon 
                        height={s(12)} 
                        width={s(12)} 
                        className="text-white stroke-white"
                    />
                </Box>
            ) : (
                <Box className='border-[#E5E5E5] rounded-full size-[18px] border-[2px]' />
            )}
        </>
    );
}
