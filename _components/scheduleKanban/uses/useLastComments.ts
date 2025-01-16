import { computed, ref } from 'vue';
import {
  getCommentsFilter,
  getLastComment,
  setLastComment,
  getLoading,
} from "../../../_store/actions/comments";
import { store } from 'src/plugins/utils'

export default function useLastComments(props: any) {
  const showTooltip = ref(false);
  const loadingComment = computed(() => getLoading());
  const card = computed(() => props.card);
  const sizeBadge = computed(() => props.sizeBadge);
  const iconClass = computed(() => props.iconClass);
  const permisionComments = computed(() =>
    store.hasAccess(`ramp.work-orders-comments.index`)
  );
  const lastComment = computed(() => getLastComment());
  async function changeLastComment(card) {
    await setLastComment("");
    if (showTooltip.value) {
      await getCommentsFilter(card.id);
    }
  }
  return {
    card,
    permisionComments,
    loadingComment,
    changeLastComment,
    lastComment,
    sizeBadge,
    iconClass,
    showTooltip,
  };
}
