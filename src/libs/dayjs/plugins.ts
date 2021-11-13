import dayjs from 'dayjs';
import RelativeTimePlugin from 'dayjs/plugin/relativeTime';
import CustomParseFormatPlugin from 'dayjs/plugin/customParseFormat';

dayjs.extend(RelativeTimePlugin);
dayjs.extend(CustomParseFormatPlugin);
