import Button from '@components/commons/Button';

import { images } from '@utils/constants';

const Pagination: IPaginationComponent<IPaginationComponentProps> = (props) => {
    const { className, current, onPageChange, totalPage } = props;

    const handleChangePage = (action: 'set' | 'next' | 'previous', value: number) => {
        let page = value;
        if (action === 'next') {
            if ((current ?? 1) < totalPage) {
                page += 1;
            }
        }
        if (action === 'previous') {
            if ((current ?? 1) > 1) {
                page -= 1;
            }
        }

        if (onPageChange) {
            onPageChange(page);
        }
    };

    const renderPage = () => {
        let firstPage = 1;
        let lastPage = totalPage;
        if (totalPage > 8) {
            if ((current ?? 1) <= 3) {
                lastPage = 6;
            } else {
                firstPage = (current ?? 1) - 1;
                lastPage = (current ?? 1) + 2;
                if ((current ?? 1) > totalPage - 4) {
                    firstPage = totalPage - 5;
                    lastPage = totalPage;
                }
            }
        }

        return [...Array(lastPage)].map((_item, index) => {
            const page = index + 1;
            if (page >= firstPage) {
                return renderButton(page.toString());
            }
        });
    };

    const renderButton = (page: string) => {
        const isCurrent = page !== '...' ? (current ?? 1) === parseInt(page) : false;
        return (
            <Button
                onClick={() => {
                    if (!isCurrent && page !== '...') handleChangePage('set', parseInt(page));
                }}
                key={page}
                fontSize="16"
                borderColor={isCurrent ? 'gray' : 'white'}
                background={isCurrent ? 'gray' : 'white'}
                textColor={isCurrent ? 'white' : 'gray'}
                buttonText={page}
                className={page === '...' ? 'bases__p-event--none' : ''}
            />
        );
    };

    const renderPageGroup = (position: 'first' | 'last') => {
        return (
            <>
                {renderButton(position === 'first' ? '1' : '...')}
                {renderButton(position === 'first' ? '...' : `${totalPage}`)}
            </>
        );
    };

    return (
        <div className={`components__pagination ${className} d-flex flex-wrap justify-content-center align-items-center`}>
            <Button
                onClick={() => {
                    if ((current ?? 1) > 1) handleChangePage('previous', current ?? 1);
                }}
                className={(current ?? 1) > 1 ? 'components__pagination_arrow' : ''}
                startIcon={images.ICON_LEFT_ARROW}
                borderColor="gray"
                background="white"
                iconColor="gray"
            />
            {totalPage > 8 && (current ?? 1) > 3 && renderPageGroup('first')}
            {renderPage()}
            {totalPage > 8 && (current ?? 1) < totalPage - 3 && renderPageGroup('last')}
            <Button
                onClick={() => {
                    if ((current ?? 1) < totalPage) handleChangePage('next', current ?? 1);
                }}
                startIcon={images.ICON_RIGHT_ARROW}
                borderColor="gray"
                background="white"
                iconColor="gray"
                className={(current ?? 1) < totalPage ? 'components__pagination_arrow' : ''}
            />
        </div>
    );
};

Pagination.defaultProps = {
    className: '',
    current: 1,
};

export default Pagination;
